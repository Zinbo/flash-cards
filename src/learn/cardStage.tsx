import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import queryString from 'query-string'
import React from 'react'
import { Button, ButtonToolbar, Col, Row } from 'react-bootstrap'
import Loading from '../common/loading'
import Card from './card'
import Menu from './menu'

interface MyProps {
  location: any
}

interface CardData {
  front: string
  back: string
}

interface MyState {
  loading: boolean
  cards: JSX.Element[]
  categoryName: string
  currentCardIndex: number
  visible: boolean
  cardData: CardData[]
}

class CardStage extends React.Component<MyProps, MyState> {
  public state: MyState = {
    loading: true,
    cards: [],
    categoryName: '',
    currentCardIndex: 0,
    visible: false,
    cardData: [],
  }

  constructor(props: MyProps) {
    super(props)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.changeCard = this.changeCard.bind(this)
  }

  public toggleMenu() {
    this.setState({
      visible: !this.state.visible,
    })
  }

  public handleMouseDown(e: React.MouseEvent) {
    this.toggleMenu()

    console.log('clicked')
    e.stopPropagation()
  }

  public getCardData(categoryId: number): CardData[] {
    // TODO: Need to actually load card data here based on categoryId
    return [
      {
        front: 'What is merge sort?',
        back: `# First header 1\nblah blah blah\n## Header 2\ngfdfdfdsfdf`,
      },
      {
        front: 'What is bubble sort?',
        back: 'dhfdjdshfsjfhdsfjsd',
      },
    ]
  }

  public getCardsFromData(cardData: CardData[]): JSX.Element[] {
    return cardData.map((cardDatum, index) => (
      <Card front={cardDatum.front} back={cardDatum.back} number={index} />
    ))
  }

  public getCategoryName(categoryId: number) {
    // TODO: Get category name
    return 'Algorithms'
  }

  public changeCard(index: number) {
    this.setState({
      currentCardIndex: index,
    })
  }

  public componentDidMount() {
    const params = queryString.parse(this.props.location.search)
    let categoryId: number = NaN
    if (typeof params.categoryId === 'string') {
      categoryId = Number(params.categoryId)
    }
    if (isNaN(categoryId)) {
      return
    } // TODO: Need to handle this
    const categoryName = this.getCategoryName(categoryId)
    const cardData = this.getCardData(categoryId)
    const cards = this.getCardsFromData(cardData)

    window.setTimeout(() => {
      this.setState({
        loading: false,
        cards,
        currentCardIndex: 0,
        categoryName,
        cardData,
      })
    }, 1000)
  }

  public render() {
    // TODO design navbar to select card
    const isFirstCard = this.state.currentCardIndex === 0
    const isLastCard = this.state.currentCardIndex === this.state.cards.length - 1
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <section className="card-stage">
        <Menu
          handleMouseDown={this.handleMouseDown}
          menuVisibility={this.state.visible}
          cards={this.state.cardData}
          currentCardIndex={this.state.currentCardIndex}
          changeCard={this.changeCard}
        />
        <div
          id="roundButton"
          onMouseDown={this.handleMouseDown}
          style={{ position: 'absolute', zIndex: 999 }}
        >
          <FontAwesomeIcon className="roundButton" icon={faBars} size="lg" />
        </div>
        <Row>
          <Col style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <h1>{this.state.categoryName}</h1>
          </Col>
        </Row>
        <Row style={{ flex: 1 }}>
          <Col>{this.state.cards[this.state.currentCardIndex]}</Col>
        </Row>
        <Row style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          {/* <Col style={{ justifyContent: 'space-evenly', alignItems: 'center', display: 'flex' }}> */}
          <Col xs="6" md="4" style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              style={{ marginRight: '10px' }}
              variant="primary"
              onClick={() => {
                this.setState({ currentCardIndex: this.state.currentCardIndex - 1 })
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
              }}
              disabled={isLastCard}
            >
              Next
            </Button>
          </Col>
          {/* </Col> */}
        </Row>
      </section>
    )
  }
}

export default CardStage
