import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import categoryController from './categories/categoriesController'
import cardsController from './cards/cardsController'
const app = express()
console.log("app value: " + app);
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/categories', categoryController)
app.use('/api/cards', cardsController)

//If being hosted from heroku then we want to serve the static files, else we serve them up with yarn start
if(process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../../client/build')))

  // Handle React routing, return all requests to React app
  app.get('*', function(req: any, res: any) {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'))
  })
}


app.listen(port, () => console.log(`Listening on port ${port}`))

export default app;