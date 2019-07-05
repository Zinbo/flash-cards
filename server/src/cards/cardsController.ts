import { Request, Response} from 'express'
import express from 'express'
import cardRepository from './cardRepository'
import Card from './card'

const router = express.Router()

router.post('/:id/rightAnswer', (req: Request, res: Response) => {
    //call repository with 
    setTimeout(() => {
      res.send()
    }, 1000);
  })


router.post('/:id/wrongAnswer', (req: Request, res: Response) => {
    setTimeout(() => {
        res.send()
    }, 1000);
})

router.post('/', async (req: Request, res: Response) => {
    const card = req.body;
    const cardEntity = Card.create(card.front, card.back, card.noRight, card.noWrong);
    const savedCard = await cardRepository.saveCard(cardEntity);
    res.send(savedCard)
})

router.put('/:id', (req: Request, res: Response) => {
    setTimeout(() => {
        const card = req.body;
        console.log('card to edit: ' + JSON.stringify(card))
        res.send()
    }, 1000);
})

router.delete('/:id', (req: Request, res: Response) => {
    setTimeout(() => {
        const id = req.params.id;
        console.log('card to delete: ' + id)
        res.send()
    }, 1000);
})

export default router;