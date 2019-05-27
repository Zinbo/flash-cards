import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import * as Showdown from 'showdown'

interface CardProps {
  front: string
  back: string
  number: number
}

const Categories: React.FC<CardProps> = (props: CardProps) => {
  const [facingFront, toggleFacingFront] = useState(true)
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })
  // TODO: Display card number
  // TODO: Use showdown to display mark up of text
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
              <span onClick={() => toggleFacingFront(!facingFront)}>
                <FontAwesomeIcon icon={faRedo} />
              </span>
            </div>
            {facingFront ? (
              <div className="card__content--front">{props.front}</div>
            ) : (
              <div
                className="card__content--back"
                dangerouslySetInnerHTML={{ __html: converter.makeHtml(props.back) }}
              />
            )}
            {// TODO: Implement buttons
            facingFront ? (
              <div className="card__actions">
                <Button variant="success">I Already Know It!</Button>
              </div>
            ) : (
              <div className="card__actions">
                <Button variant="success">I knew it!</Button>
                <Button variant="danger">Got it wrong...</Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Categories
