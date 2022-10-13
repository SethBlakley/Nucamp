// require express
// morgan for logging information about requests made
const express = require('express')
const morgan = require('morgan')

// bring in routers
const campsiteRouter = require('./routes/campsiteRouter')
const partnerRouter = require('./routes/partnerRouter')
const promotionRouter = require('./routes/promotionRouter')

const hostname = 'localhost'
const port = 3000

// use basic express middleware for morgan logging and converting req.body from json
const app = express()
app.use(morgan('dev'))
app.use(express.json())

// use our routers specifying the path here
app.use('/campsites', campsiteRouter)
app.use('/promotions', promotionRouter)
app.use('/partners', partnerRouter)

// serve static files from public folders if applicable
app.use(express.static(__dirname + '/public'))

app.use((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<html><body><h1>This is an express server</h1></body></html>')
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})