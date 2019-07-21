import { prop, Typegoose } from 'typegoose';
import { ObjectID } from 'bson';

class Card extends Typegoose {

    public static create(front: string, back: string): Card {
      const self = new Card();
      self.front = front;
      self.back = back;
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
    noRight: number = 0;
    @prop() 
    noWrong: number = 0;
  }

export default Card;