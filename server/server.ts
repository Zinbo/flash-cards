const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
import sayHello from './category-controller'

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// API calls
app.get('/api/hello', (req: any, res: any) => {
  res.send({ express: sayHello() })
})

app.post('/api/world', (req: any, res: any) => {
  console.log(req.body)
  res.send(`I received your POST request. This is what you sent me: ${req.body.post}`)
})

// Serve any static files
app.use(express.static(path.join(__dirname, '../../client/build')))

// Handle React routing, return all requests to React app
app.get('*', function(req: any, res: any) {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'))
})

app.listen(port, () => console.log(`Listening on port ${port}`))
