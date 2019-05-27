import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'

interface Card {
  front: string
}

interface MyProps {
  menuVisibility: boolean
  handleMouseDown: (event: React.MouseEvent) => void
  cards: Card[]
  currentCardIndex: number
  changeCard: (index: number) => void
}

class Menu extends Component<MyProps> {
  public render() {
    let visibility = 'hide'

    if (this.props.menuVisibility) {
      visibility = 'show'
    }

    return (
      <div id="flyoutMenu" className={visibility}>
        <div className="close-menu">
          <span onMouseDown={this.props.handleMouseDown}>
            <FontAwesomeIcon icon={faWindowClose} />
          </span>
        </div>
        <h2>Cards</h2>
        <ol>
          {this.props.cards.map((card, index) => {
            return (
              <li>
                <span
                  className={index === this.props.currentCardIndex ? 'active' : ''}
                  onClick={() => this.props.changeCard(index)}
                >
                  {card.front}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
}

export default Menu
