import { prop, Typegoose } from 'typegoose'
import { ObjectID } from 'bson'
import Card from './card'
import { InstanceType } from 'typegoose'

export default class Category extends Typegoose {
  @prop()
  _id: ObjectID = new ObjectID()
  @prop()
  name: string = ''
  @prop()
  cards: Card[] = []
  @prop()
  isDeleted = false

  public static create(name: string): Category {
    const self = new Category()
    self.name = name
    return self
  }

  public static createFromModel(other: InstanceType<Category>): Category {
    const self = new Category()
    self._id = other._id
    self.name = other.name
    self.cards = other.cards
    self.isDeleted = other.isDeleted
    return self
  }

  public addCard(front: string, back: string): Card {
    const card = Card.create(front, back)
    this.cards.push(card)
    return card
  }

  public incrementNoOfRightGuessesForCard(cardId: string) {
    const card = this.getCardById(new ObjectID(cardId))
    if (card === undefined) return
    card.noRight++
  }

  public incrementNoOfWrongGuessesForCard(cardId: string) {
    const card = this.getCardById(new ObjectID(cardId))
    if (card === undefined) return
    card.noWrong++
  }

  public updateCard(cardId: string, front: string, back: string) {
    const card = this.getCardById(new ObjectID(cardId))
    if (card === undefined) return
    card.front = front
    card.back = back
  }

  public deleteCard(cardId: any): void {
    const index = this.cards.findIndex(card => {
      if (card._id === undefined) return
      return new ObjectID(cardId).equals(card._id)
    })
    if (index == -1) {
      console.log('Cant find card, deleting nothing!')
      return
    }
    console.log('Going to delete card with index: ' + index)
    console.log(
      `card to delete:\nfront: ${this.cards[index].front}\nback: ${this.cards[index].back}`
    )
    this.cards.splice(index, 1)
  }

  private getCardById(cardId: ObjectID): Card | undefined {
    return this.cards.find(card => {
      if (card._id === undefined) return
      return cardId.equals(card._id)
    })
  }
}
