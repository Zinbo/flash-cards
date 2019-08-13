import mongoose from 'mongoose'
import Card from '../categories/card'
import Category from '../categories/category'
import { ObjectID } from 'bson'

// TODO: improve this, can I just call this on the typegoose class?
const CardModel = new Card().getModelForClass(Card)
const CategoryModel = new Category().getModelForClass(Category)

class CategoriesRepository {
  constructor() {
    const mongodbPassword = process.env.mongodbpassword
    const mongoDb = process.env.mongodb
    //TODO: Pull this out so I can use a different db in prod
    const connectionString = `mongodb+srv://Zinbo:${mongodbPassword}@zinbo-w18br.mongodb.net/${mongoDb}?retryWrites=true&w=majority`
    mongoose.connect(connectionString)
  }

  async softDeleteCategoryById(categoryId: string): Promise<void> {
    //TODO: Delete isn't working
    await CategoryModel.findOneAndUpdate(
      { _id: new ObjectID(categoryId) },
      {
        $set: { isDeleted: true },
      }
    )
  }

  async saveCategory(category: Category): Promise<Category> {
    const categoryToSave = new CategoryModel(category)
    const instanceModel = await categoryToSave.save()
    return instanceModel.toObject()
  }

  async updateCategory(category: Category): Promise<Category> {
    const categoryToSave = new CategoryModel(category)
    categoryToSave.isNew = false
    console.log(`category to update: ${categoryToSave}`)
    const instanceModel = await categoryToSave.save()
    return instanceModel.toObject()
  }

  async getAllCategories(): Promise<Category[]> {
    return await CategoryModel.find({ isDeleted: false })
  }

  async getCategoryById(categoryId: string): Promise<Category | null> {
    console.log(`looking for category with id: ${categoryId}`)
    const categoryModel = await CategoryModel.findById(new ObjectID(categoryId))
    if (categoryModel == null) throw new Error('category cannot be null!')
    return Category.createFromModel(categoryModel)
  }
}

const categoriesRepository: CategoriesRepository = new CategoriesRepository()
export default categoriesRepository

// Will take in domain objects and convert them to Entities to be saved. Most likely in this case they will be the same thing.
