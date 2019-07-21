import mongoose from 'mongoose'; 
import Card from '../categories/card'
import Category from '../categories/category'
import { ObjectID } from 'bson';

// TODO: improve this, can I just call this on the typegoose class?
const CardModel = new Card().getModelForClass(Card);
const CategoryModel = new Category().getModelForClass(Category)

class CategoriesRepository {
    constructor() {
        const mongodbPassword = process.env.mongodbpassword
        mongoose.connect(`mongodb+srv://Zinbo:${mongodbPassword}@zinbo-w18br.mongodb.net/flashcarddb?retryWrites=true&w=majority`);
    }

    async softDeleteCategoryById(categoryId: string) : Promise<void> {
        //TODO: Delete isn't working
        const foundCategory = CategoryModel.findOne({_id: categoryId });
        CategoryModel.findOneAndDelete({_id: categoryId }, (err: any) => {
            console.log(`Got error when deleting: ${err}`)
        });
    }

    async saveCategory(category: Category) : Promise<Category> {
        const categoryToSave = new CategoryModel(category);
        const instanceModel = await categoryToSave.save();
        return instanceModel.toObject();
    }

    async getAllCategories() : Promise<Category[]> {
        return await CategoryModel.find();
    }

    async saveCard(card: Card) : Promise<Card> {
        const cardToSave = new CardModel(card);
        const instanceModel = await cardToSave.save();
        return instanceModel.toObject();
    }

    async getCategoryById(categoryId: string) : Promise<Category | null> {
        return await CategoryModel.findById(categoryId);
    }
}

const categoriesRepository : CategoriesRepository = new CategoriesRepository();
export default categoriesRepository;

// Will take in domain objects and convert them to Entities to be saved. Most likely in this case they will be the same thing.
