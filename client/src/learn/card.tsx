import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import * as Showdown from 'showdown'
import './learn.css'

interface CardProps {
  id: number
  front: string
  back: string
  cardNumber: number
  totalNumberOfCards: number
  handleKnowButtonClick: (id: number) => void
  handleWrongButtonClick: (id: number) => void
  flipCardToFront: (faceFront: boolean) => void
  faceFront: boolean
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })
  return (
    <div className="card-holder">
      <Row
        style={{
          flex: 1,
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Col
          xs={true}
          md="8"
          style={{
            flex: 1,
          }}
        >
          <div className="flash-card">
            <div className="card__flip-card">
              <span
                onClick={() => {
                  console.log('clicked redo')
                  props.flipCardToFront(!props.faceFront)
                }}
              >
                <FontAwesomeIcon icon={faRedo} />
              </span>
            </div>
            <div className="card__card-number">{`${props.cardNumber}/${
              props.totalNumberOfCards
            }`}</div>
            {props.faceFront ? (
              <div className="card__content--front">{props.front}</div>
            ) : (
              <div
                className="card__content--back"
                dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.back) }}
              />
            )}
            {props.faceFront ? (
              <div className="card__actions">
                <Button
                  variant="success"
                  onClick={() => {
                    props.handleKnowButtonClick(props.id)
                    props.flipCardToFront(true)
                  }}
                >
                  {/* <Button variant="success"> */}I Already Know It!
                </Button>
              </div>
            ) : (
              <div className="card__actions">
                <Button
                  variant="success"
                  onClick={() => {
                    props.handleKnowButtonClick(props.id)
                    props.flipCardToFront(true)
                  }}
                >
                  I knew it!
                </Button>
                {/* <Button variant="success"> */}
                <Button
                  variant="danger"
                  onClick={() => {
                    props.handleWrongButtonClick(props.id)
                    props.flipCardToFront(true)
                  }}
                >
                  Got it wrong...
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Card
