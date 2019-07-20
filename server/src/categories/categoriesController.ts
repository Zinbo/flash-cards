import { Request, Response } from 'express'
import express from 'express'
import cardRepository from '../cards/cardRepository'
import Card from '../cards/card'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  setTimeout(() => {
    res.send([
      {
        id: 1,
        name: 'Data Structures',
      },
      {
        id: 2,
        name: 'Algorithms',
      },
      {
        id: 3,
        name: 'C++',
      },
      {
        id: 4,
        name: 'Java',
      },
    ])
  }, 1000)
})

router.get('/:categoryId', (req: Request, res: Response) => {
  setTimeout(() => {
    res.send({
      id: 1,
      name: 'My category name placeholder',
    })
  }, 1000)
})

router.delete('/:id', (req: Request, res: Response) => {
  setTimeout(() => {
    const id = req.params.id
    console.log('category to delete: ' + id)
    res.send()
  }, 1000)
})

router.post('/', (req: Request, res: Response) => {
  setTimeout(() => {
    const category = req.body
    console.log('category to save: ' + JSON.stringify(category))
    res.send({
      id: Math.floor(Math.random() * 1000),
      ...category,
    })
  }, 1000)
})

//************CARDS*************/

router.get('/:categoryId/cards', (req: Request, res: Response) => {
  setTimeout(() => {
    res.send([
      {
        id: 1,
        front: 'What is merge sort?',
        back: `# First header 1\nblah blah blah\n## Header 2\ngfdfdfdsfdf`,
        noRight: 5,
        noWrong: 0,
      },
      {
        id: 2,
        front: 'What is bubble sort?',
        back: 'dhfdjdshfsjfhdsfjsd',
        noRight: 0,
        noWrong: 2,
      },
      {
        id: 3,
        front: 'What is hash sort?',
        back: 'Hash sort is blah blah blah blah',
        noRight: 10,
        noWrong: 60,
      },
    ])
  }, 1000)
})

router.post('/:categoryId/cards', async (req: Request, res: Response) => {
  const card = req.body
  const cardEntity = Card.create(card.front, card.back, card.noRight, card.noWrong)
  const savedCard = await cardRepository.saveCard(cardEntity)
  res.send(savedCard)
})

router.post('/:categoryId/cards/:cardId/rightAnswer', (req: Request, res: Response) => {
  //call repository with
  setTimeout(() => {
    res.send()
  }, 1000)
})

router.post('/:categoryId/cards/:cardId/wrongAnswer', (req: Request, res: Response) => {
  setTimeout(() => {
    res.send()
  }, 1000)
})

router.put('/:categoryId/cards/:cardId', (req: Request, res: Response) => {
  setTimeout(() => {
    const card = req.body
    console.log('card to edit: ' + JSON.stringify(card))
    res.send()
  }, 1000)
})

router.delete('/:categoryId/cards/:cardId', (req: Request, res: Response) => {
  setTimeout(() => {
    const id = req.params.id
    console.log('card to delete: ' + id)
    res.send()
  }, 1000)
})

export default router
