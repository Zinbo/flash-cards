import { prop, Typegoose } from 'typegoose';
import { ObjectID } from 'bson';
import Card from './card';

export default class Category extends Typegoose {
    @prop()
    _id: ObjectID = new ObjectID();
    @prop()
    name: string = "";
    @prop()
    cards: Card[] = [];
    @prop()
    isDeleted = false

    public static create(name: string) : Category {
        const self = new Category();
        self.name = name;
        return self;
    }

    public addCard(front: string, back: string) {
        const card = Card.create(front, back);
        this.cards.push(card);
    }

    public incrementNoOfRightGuessesForCard(cardId: ObjectID) {
        const card = this.getCardById(cardId);
        if(card === undefined) return;
        card.noRight++;
    }

    public incrementNoOfWrongGuessesForCard(cardId: ObjectID) {
        const card = this.getCardById(cardId);
        if(card === undefined) return;
        card.noWrong++;
    }

    public updateCard(cardId: ObjectID, front: string, back: string) {
        const card = this.getCardById(cardId);
        if(card === undefined) return;
        card.front = front;
        card.back = back;
    }

    public deleteCard(cardId: any) : void {
        const index = this.cards.findIndex(card => card._id === cardId);
        this.cards.splice(index, 1)
    }

    private getCardById(cardId: ObjectID) : Card | undefined {
        return this.cards.find(card => card._id === cardId);
    }
}
