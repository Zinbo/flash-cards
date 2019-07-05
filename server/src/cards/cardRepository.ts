import { prop, Typegoose, ModelType, InstanceType } from 'typegoose';
import mongoose from 'mongoose'; 
import Card from './card'
import { json } from 'body-parser';

const CardModel = new Card().getModelForClass(Card);
class CardRepository {
    constructor() {
        console.log('mongoose: ' + mongoose)
        console.log('mongoose connect: ' + mongoose.connect)
        const mongodbPassword = process.env.mongodbpassword
        console.log('The value of password is: ' + mongodbPassword)
        mongoose.connect(`mongodb+srv://Zinbo:${mongodbPassword}@zinbo-w18br.mongodb.net/flashcarddb?retryWrites=true&w=majority`);
    }
    
    async saveCard(card: Card) : Promise<Card> {
        const cardToSave = new CardModel(card);
        const instanceModel = await cardToSave.save();
        return instanceModel.toObject();
    }
}

const cardRepository = new CardRepository();
export default cardRepository;