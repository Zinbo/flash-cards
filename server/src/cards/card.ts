import { prop, Typegoose } from 'typegoose';
import { ObjectID } from 'bson';

class Card extends Typegoose {

    public static create(front: string, back: string, noRight: number, noWrong: number): Card {
      const self = new Card();
      self.front = front;
      self.back = back;
      self.noRight = noRight;
      self.noWrong = noWrong;
      self._id = new ObjectID();
      return self;
    }
    @prop()
    _id?: ObjectID;
    @prop()
    front: string = "";
    @prop()
    back: string = "";
    @prop()
    noRight: Number = 0;
    @prop() 
    noWrong: Number = 0;
  }

export default Card;