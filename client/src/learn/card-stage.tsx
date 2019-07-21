import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import queryString from 'query-string'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import toastr from 'toastr'
import FlashCard from '../common/flash-card'
import Loading from '../common/loading'
import Card from './card'
import './learn.css'
import Menu from './menu'

interface MyProps {
  location: any
}

interface MyState {
  categoryId: Number
  loading: boolean
  cards: JSX.Element[]
  categoryName: string
  currentCardIndex: number
  visible: boolean
  cardData: FlashCard[]
  cardFacingFront: boolean
}

class CardStage extends React.Component<MyProps, MyState> {
  public state: MyState = {
    categoryId: -1,
    loading: true,
    cards: [],
    categoryName: '',
    currentCardIndex: 0,
    visible: false,
    cardData: [],
    cardFacingFront: true,
  }

  constructor(props: MyProps) {
    super(props)
    this.handleMenuMouseDown = this.handleMenuMouseDown.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.changeCard = this.changeCard.bind(this)
    this.closeMenuIfOpen = this.closeMenuIfOpen.bind(this)
    this.handleIDontKnowButton = this.handleIDontKnowButton.bind(this)
    this.handleIKnowButton = this.handleIKnowButton.bind(this)
    this.flipCardToFront = this.flipCardToFront.bind(this)
  }

  public async componentDidMount() {
    const params = queryString.parse(this.props.location.search)
    let categoryId: number = NaN
    if (typeof params.categoryId === 'string') {
      categoryId = Number(params.categoryId)
    }
    if (isNaN(categoryId)) {
      return
    } // TODO: Need to handle this
    const categoryNamePromise = this.getCategoryName(categoryId)
    const cardDataPromise = this.getCardData(categoryId)
    const categoryName = await categoryNamePromise;
    const cardData = await cardDataPromise;
    const cards = this.getCardsFromData(cardData)
    this.setState({
      categoryId,
      loading: false,
      cards,
      currentCardIndex: 0,
      categoryName,
      cardData,
    })
  }

  public toggleMenu(newState?: boolean) {
    const visible = newState !== undefined ? newState : !this.state.visible
    this.setState({
      visible,
    })
  }

  public handleMenuMouseDown(e: React.MouseEvent) {
    this.toggleMenu()
    e.stopPropagation()
  }

  public async getCardData(categoryId: number): Promise<FlashCard[]> {
    const response = await fetch(`/api/categories/${categoryId}/cards`);
    return await response.json(); 
  }

  public flipCardToFront(faceFront: boolean) {
    this.setState({
      cardFacingFront: faceFront,
    })
  }

  public getCardsFromData(cardData: FlashCard[]): JSX.Element[] {
    return cardData.map((cardDatum, index) => (
      <Card
        id={cardDatum._id}
        front={cardDatum.front}
        back={cardDatum.back}
        cardNumber={index + 1}
        totalNumberOfCards={cardData.length}
        handleKnowButtonClick={id => this.handleIKnowButton(id)}
        handleWrongButtonClick={id => this.handleIDontKnowButton(id)}
        faceFront={this.state.cardFacingFront}
        flipCardToFront={this.flipCardToFront}
      />
    ))
  }

  public handleIKnowButton(id: number) : void {
    fetch(`/api/categories/${this.state.categoryId}/cards/${id}/rightAnswer`, {method: 'POST'});
    toastr.success('Good job!')
    this.changeCard(this.state.currentCardIndex + 1)
  }

  public handleIDontKnowButton(id: number) {
    fetch(`/api/categories/${this.state.categoryId}/cards/${id}/wrongAnswer`, {method: 'POST'});
    toastr.warning('Better luck next time!')
    this.changeCard(this.state.currentCardIndex + 1)
  }

  public async getCategoryName(categoryId: number) : Promise<string> {
    const response = await fetch(`/api/categories/${categoryId}`)
    const category = await response.json();
    const name = category.name;
    return name;
  }

  public changeCard(index: number) {
    this.setState({
      currentCardIndex: index,
    })
  }

  public closeMenuIfOpen() {
    this.toggleMenu(false)
  }

  public render() {
    const isFirstCard = this.state.currentCardIndex === 0
    const isPastLastCard = this.state.currentCardIndex === this.state.cards.length
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <section className="card-stage" onMouseDown={this.closeMenuIfOpen}>
        <Menu
          closeMenu={this.handleMenuMouseDown}
          menuVisibility={this.state.visible}
          cards={this.state.cardData}
          currentCardIndex={this.state.currentCardIndex}
          changeCard={this.changeCard}
        />
        <div
          id="roundButton"
          onMouseDown={this.handleMenuMouseDown}
          style={{ position: 'absolute', zIndex: 999 }}
        >
          <FontAwesomeIcon className="roundButton" icon={faBars} size="lg" />
        </div>
        <Row>
          <Col style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <h1>{this.state.categoryName}</h1>
          </Col>
        </Row>
        {isPastLastCard ? (
          <h1 className="loading" style={{ textAlign: 'center' }}>
            Finished, well done!
          </h1>
        ) : (
          <div style={{ height: '100%', display: 'flex', 'flex-direction': 'column' }}>
            <Row style={{ flex: 1 }}>
              {/* <Col>{this.state.cards[this.state.currentCardIndex]}</Col> */}
              <Col>
                <Card
                  id={this.state.cardData[this.state.currentCardIndex]._id}
                  front={this.state.cardData[this.state.currentCardIndex].front}
                  back={this.state.cardData[this.state.currentCardIndex].back}
                  cardNumber={this.state.currentCardIndex + 1}
                  totalNumberOfCards={this.state.cardData.length}
                  handleKnowButtonClick={id => this.handleIKnowButton(id)}
                  handleWrongButtonClick={id => this.handleIDontKnowButton(id)}
                  faceFront={this.state.cardFacingFront}
                  flipCardToFront={this.flipCardToFront}
                />
              </Col>
            </Row>
            <Row style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Col xs="6" md="4" style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                  style={{ marginRight: '10px' }}
                  variant="primary"
                  onClick={() => {
                    this.setState({ currentCardIndex: this.state.currentCardIndex - 1 })
                    this.flipCardToFront(true)
                  }}
                  disabled={isFirstCard}
                >
                  Previous
                </Button>
              </Col>
              <Col xs="6" md="4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="primary"
                  onClick={() => {
                    this.setState({ currentCardIndex: this.state.currentCardIndex + 1 })
                    this.flipCardToFront(true)
                  }}
                >
                  Next
                </Button>
              </Col>
              {/* </Col> */}
            </Row>
          </div>
        )}
      </section>
    )
  }
}

export default CardStage
