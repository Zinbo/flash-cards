import { Request, Response} from 'express'
import express from 'express'

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
        name: 'Java'
      }
    ]);
  }, 1000);
})

router.get('/:categoryId', (req: Request, res: Response) => {
  setTimeout(() => {
    res.send({
      id: 1,
      name: "My category name placeholder"
    });
  }, 1000);
})

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
    ]);
  }, 1000);
})

router.delete('/:id', (req: Request, res: Response) => {
  setTimeout(() => {
      const id = req.params.id;
      console.log('category to delete: ' + id)
      res.send()
  }, 1000);
})

router.post('/', (req: Request, res: Response) => {
  setTimeout(() => {
      const category = req.body;
      console.log('category to save: ' + JSON.stringify(category))
      res.send({
        id: Math.floor(Math.random() * 1000),
        ...category
      })
  }, 1000);
})

export default router
