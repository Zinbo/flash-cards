import { faPencilAlt, faSdCard, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import QueryString from 'query-string'
import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import { RouteComponentProps } from 'react-router'
import toastr from 'toastr'
import DeleteCardModal from '../common/delete-modal'
import FlashCard from '../common/flash-card'
import CardModal from './new-card-modal'

interface CardOverviewState {
  cards: FlashCard[]
  showNewCardModal: boolean
  showEditCardModal: boolean
  showDeleteCardModal: boolean
  cardToEdit?: FlashCard
  cardToDelete?: FlashCard
}

class cardOverview extends React.Component<RouteComponentProps, CardOverviewState> {
  public state: CardOverviewState = {
    cards: [],
    showNewCardModal: false,
    showEditCardModal: false,
    showDeleteCardModal: false,
    cardToEdit: undefined,
    cardToDelete: undefined,
  }
  constructor(props: RouteComponentProps) {
    super(props)
    this.onAddCard = this.onAddCard.bind(this)
    this.onCloseNewCardModal = this.onCloseNewCardModal.bind(this)
    this.onEditCard = this.onEditCard.bind(this)
    this.onCloseEditCardModal = this.onCloseEditCardModal.bind(this)
    this.onDeleteCard = this.onDeleteCard.bind(this)
  }
  public componentDidMount() {
    const params = QueryString.parse(this.props.location.search)
    if (typeof params.categoryId !== 'string') {
      return
    } // TODO error handling here?
    const categoryId = Number(params.categoryId)

    const cards = this.getCards(categoryId)
    this.setState({
      cards,
    })
  }

  public getCards(categoryId: number): FlashCard[] {
    // TODO: Get cards based on categoryId

    return [
      {
        id: 1,
        front: 'what is merge sort?',
        back: 'merge sort is blah blah',
      },
      {
        id: 2,
        front: 'What is quick sort?',
        back: 'Quick sort is blah blah blah',
      },
      {
        id: 3,
        front: 'What is hash sort?',
        back: 'Hash sort is blah blah blah blah',
      },
    ]
  }
  public onCloseNewCardModal() {
    this.setState({
      showNewCardModal: false,
    })
  }

  public async onAddCard(card: FlashCard) {
    const newCards = [...this.state.cards]
    newCards.push(card)
    // TODO: Save card
    this.setState(
      {
        cards: newCards,
      },
      this.onCloseNewCardModal
    )
    toastr.success(`"${card.front}" card added successfully`)
  }

  public async onEditCard(cardToEdit: FlashCard) {
    // TODO call to edit card
    const cards = [...this.state.cards]
    const foundCard = cards.find(card => card.id === cardToEdit.id)
    // TODO some error handling here
    if (typeof foundCard === 'undefined') {
      return
    }
    foundCard.front = cardToEdit.front
    foundCard.back = cardToEdit.back
    this.setState(
      {
        cards,
      },
      this.onCloseEditCardModal
    )
    toastr.success(`"${cardToEdit.front}" card editted successfully`)
  }

  public onCloseEditCardModal() {
    this.setState({
      showEditCardModal: false,
      cardToEdit: undefined,
    })
  }

  public onDeleteCard() {
    // TODO actually delete card
    // TODO some error handling?
    if (!this.state.cardToDelete) {
      return
    }
    const id = this.state.cardToDelete.id
    const cards = this.state.cards
    const index = cards.findIndex(card => card.id === id)
    // TODO error handling?
    if (index === -1) {
      return
    }
    cards.splice(index, 1)
    toastr.success(`Card "${this.state.cardToDelete.front}" successfully deleted`)
    this.setState(
      {
        cards,
      },
      this.onCloseDeleteModal
    )
  }

  public onCloseDeleteModal() {
    this.setState({
      showDeleteCardModal: false,
      cardToDelete: undefined,
    })
  }

  public render() {
    return (
      <div>
        <CardModal
          show={this.state.showNewCardModal}
          onClose={this.onCloseNewCardModal}
          onSave={this.onAddCard}
        />
        <CardModal
          key={this.state.cardToEdit ? this.state.cardToEdit.id : -1}
          show={this.state.showEditCardModal}
          onClose={this.onCloseEditCardModal}
          onSave={this.onEditCard}
          existingCard={this.state.cardToEdit}
        />
        <DeleteCardModal
          onDelete={this.onDeleteCard}
          onClose={this.onCloseDeleteModal}
          show={this.state.showDeleteCardModal}
        >
          {this.state.cardToDelete ? `Delete "${this.state.cardToDelete.front}" card?` : ''}
        </DeleteCardModal>
        <Row className="justify-content-md-center first-row">
          <Col lg="8" style={{ justifyContent: 'flex-end', alignItems: 'center', display: 'flex' }}>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ showNewCardModal: true })
              }}
            >
              Add New Card
            </Button>
          </Col>
        </Row>
        <Accordion>
          {this.state.cards.map((card, index) => {
            return (
              <Row
                className={
                  index === 0 ? 'justify-content-md-center first-row' : 'justify-content-md-center'
                }
              >
                <Col lg="8">
                  <Card>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={String(index)}>
                      <Row>
                        <Col xs="11">{card.front}</Col>
                        <Col className="ml-auto text-right" lg="1">
                          <span
                            onClick={() =>
                              this.setState({ showEditCardModal: true, cardToEdit: card })
                            }
                          >
                            <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '10px' }} />
                          </span>
                          <span
                            className="delete-icon"
                            onClick={() =>
                              this.setState({
                                showDeleteCardModal: true,
                                cardToDelete: card,
                              })
                            }
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </span>
                        </Col>
                      </Row>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={String(index)}>
                      <Card.Body>{card.back}</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Col>
              </Row>
            )
          })}
        </Accordion>
      </div>
    )
  }
}

export default cardOverview
