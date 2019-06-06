import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import './learn.css'

interface Card {
  front: string
}

interface MyProps {
  menuVisibility: boolean
  closeMenu: (e: React.MouseEvent) => void
  cards: Card[]
  currentCardIndex: number
  changeCard: (index: number) => void
}

const menu: React.FC<MyProps> = (props: MyProps) => {
  let visibility = 'hide'

  if (props.menuVisibility) {
    visibility = 'show'
  }

  // This is necessary as I've made it so that if you click anywhere on the card stage it closes the menu, however I don't want this to happen
  // if you click inside the menu but not on a button. The .closeMenu function calls stopPropagation, so if the user clicks on a button
  // inside the menu this method will not trigger
  const handleClickOnMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div id="flyoutMenu" className={visibility} onMouseDown={handleClickOnMenu}>
      <div className="close-menu">
        <span onMouseDown={props.closeMenu}>
          <FontAwesomeIcon icon={faWindowClose} />
        </span>
      </div>
      <h2>Cards</h2>
      <ol>
        {props.cards.map((card, index) => {
          return (
            <li>
              <span
                className={index === props.currentCardIndex ? 'active' : ''}
                onMouseDown={(e: React.MouseEvent) => {
                  props.changeCard(index)
                  props.closeMenu(e)
                }}
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

export default menu
