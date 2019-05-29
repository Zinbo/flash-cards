import * as React from 'react'
import { Button, Col, FormControl, InputGroup, Modal, Row } from 'react-bootstrap'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import * as Showdown from 'showdown'
import FlashCard from '../common/flash-card'

interface CardModalState {
  cardBack: string
  tab: 'write' | 'preview'
  cardTitle: string
}

interface CardModalProps {
  onSave: (card: FlashCard) => Promise<void>
  show: boolean
  onClose: () => void
  existingCard?: FlashCard
}

export default class CardModal extends React.Component<CardModalProps, CardModalState> {
  public converter: Showdown.Converter

  constructor(props: CardModalProps) {
    super(props)
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
    })
    this.state = {
      tab: 'write',
      cardTitle: this.props.existingCard ? this.props.existingCard.front : '',
      cardBack: this.props.existingCard ? this.props.existingCard.back : '',
    }

    this.handleSave = this.handleSave.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  public handleValueChange = (value: string) => {
    this.setState({ cardBack: value })
  }

  public handleTabChange = (tab: 'write' | 'preview') => {
    this.setState({ tab })
  }

  public handleCardTitleChange = (event: any) => {
    this.setState({
      cardTitle: event.target.value,
    })
  }

  public handleClose() {
    // Clear out data
    this.resetModal(this.props.onClose)
  }

  public async handleSave() {
    // TODO there must be a better way to do this then use -1? Optional id?
    if (this.props.existingCard) {
      await this.props.onSave({
        id: this.props.existingCard.id,
        front: this.state.cardTitle,
        back: this.state.cardBack,
        noRight: this.props.existingCard.noRight,
        noWrong: this.props.existingCard.noWrong
      })
    } else {
      await this.props.onSave({ id: -1, front: this.state.cardTitle, back: this.state.cardBack, noRight: 0, noWrong: 0 })
    }
    this.resetModal()
  }

  public handleMarkDownPreview = (markdown: string) => {
    return Promise.resolve(this.converter.makeHtml(markdown))
  }

  public render() {
    return (
      <Modal show={this.props.show} onHide={this.handleClose}>
        <Modal.Header closeButton={true}>Add New Card</Modal.Header>
        <Modal.Body>
          <div style={{ paddingBottom: '20px' }}>
            <h6>Card Front</h6>
            <InputGroup>
              <FormControl
                id="card-front"
                placeholder="Card Title..."
                aria-label="Card Title"
                value={this.state.cardTitle}
                onChange={this.handleCardTitleChange}
              />
            </InputGroup>
          </div>
          <h6>Card Back</h6>
          <ReactMde
            onChange={this.handleValueChange}
            onTabChange={this.handleTabChange}
            value={this.state.cardBack}
            generateMarkdownPreview={this.handleMarkDownPreview}
            selectedTab={this.state.tab}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  private resetModal(callback?: () => void) {
    this.setState(
      {
        cardTitle: '',
        cardBack: '',
        tab: 'write',
      },
      callback
    )
  }
}
