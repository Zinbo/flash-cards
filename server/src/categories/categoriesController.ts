import { Request, Response} from 'express'
import express from 'express'
import Card from './card'
import Category from './category'
import categoriesRepository from './categoriesRepository'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  console.log("Getting all categories...")
  const categories = await categoriesRepository.getAllCategories();
  res.send(categories);
  console.log(`returning ${categories.length} categories`)
})

router.get('/:categoryId',  async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  console.log(`Getting category with id ${categoryId}...`)
  const category = await categoriesRepository.getCategoryById(categoryId);
  if(category === null) {
    attachCategoryNotFoundToResponse(categoryId, res);
    return;
  }
  res.send(category);
  console.log(`returning category with id ${categoryId}`)
})

function attachCategoryNotFoundToResponse(categoryId: any, res: Response) {
  res.status(404).send(`Cannot find category with id: ${categoryId}`);
}

router.delete('/:categoryId', (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  console.log(`deleting category with id ${categoryId}...`)
  categoriesRepository.softDeleteCategoryById(categoryId);
  res.send();
  console.log(`deleted category with id`)
})

router.get('/:categoryId/cards', async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  console.log(`Getting cards for category with id ${categoryId}...`)
  const category = await categoriesRepository.getCategoryById(categoryId);
  if(category === null) {
    attachCategoryNotFoundToResponse(categoryId, res);
    return;
  }
  res.send(category.cards);
  console.log(`Returning ${category.cards.length} cards for category with id ${categoryId}.`)
})


router.post('/', async (req: Request, res: Response) => {
  const categoryFromBody = req.body;
  console.log(`Adding category with name: '${categoryFromBody.name}'...`)
  const categoryToSave = Category.create(categoryFromBody.name);
  const savedCategory = await categoriesRepository.saveCategory(categoryToSave);
  res.send(savedCategory);
  console.log(`Added category.`)
})


// CARDS //
router.post('/:categoryId/cards/:cardId/rightAnswer', async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const cardId = req.params.cardId;
  console.log(`Incrementing right answer for card with id ${cardId}...`)
  const category = await categoriesRepository.getCategoryById(categoryId);
  if(category === null) {
    attachCategoryNotFoundToResponse(categoryId, res);
    return;
  }
  category.incrementNoOfRightGuessesForCard(cardId);
  res.send()
  console.log(`Incremented right answer for card.`)
})


router.post('/:categoryId/cards/:id/wrongAnswer', async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const cardId = req.params.cardId;
  console.log(`Incrementing wrong answers for card with id ${cardId}...`)
  const category = await categoriesRepository.getCategoryById(categoryId);
  if(category === null) {
    attachCategoryNotFoundToResponse(categoryId, res);
    return;
  }
  category.incrementNoOfWrongGuessesForCard(cardId);
  res.send()
  console.log(`Incremented wrong answer for card`)
})

router.post('/:categoryId/cards/', async (req: Request, res: Response) => {
  const card = req.body;
  const categoryId = req.params.categoryId;
  console.log(`Adding card to category with id ${categoryId}...`)
  const category = await categoriesRepository.getCategoryById(categoryId);
  if(category === null) {
    attachCategoryNotFoundToResponse(categoryId, res);
    return;
  }
  category.addCard(card.front, card.back);
  categoriesRepository.saveCategory(category);
  res.send();
  console.log(`Add card.`)
})

router.put('/:categoryId/cards/:cardId', async (req: Request, res: Response) => {
  const card = req.body;
  const categoryId = req.params.categoryId;
  const cardId = req.params.cardId;
  console.log(`Editting card with id ${cardId}...`)
  const category = await categoriesRepository.getCategoryById(categoryId);
  if(category === null) {
    attachCategoryNotFoundToResponse(categoryId, res);
    return;
  }
  category.updateCard(cardId, card.front, card.back);
  categoriesRepository.saveCategory(category);
  res.send();
  console.log(`Editted card.`)
})

router.delete('/:categoryId/cards/:cardId', async (req: Request, res: Response) => {
  const card = req.body;
  const categoryId = req.params.categoryId;
  const cardId = req.params.cardId;
  console.log(`deleting card with id ${cardId}...`)
  const category = await categoriesRepository.getCategoryById(categoryId);
  if(category === null) {
    attachCategoryNotFoundToResponse(categoryId, res);
    return;
  }
  category.deleteCard(cardId);
  categoriesRepository.saveCategory(category);
  res.send();
  console.log(`Deleted card.`)
})

export default router
