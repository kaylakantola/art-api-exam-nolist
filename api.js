//REQUIREMENTS
require('dotenv').config() //connects api.js to your .env file
const express = require('express') //brings in express…
const app = express() //… and runs it.
const HTTPError = require('node-http-error') // hooray, a way to handle errors!
const bodyParser = require('body-parser') //brings in body-parser…
app.use(bodyParser.json()) //… and runs it.
const { propOr, not, isEmpty } = require('ramda')
const { createPainting } = require('./dal')
const port = propOr(9999, 'PORT', process.env) //cool, now you have a port!
const reqFieldChecker = require('./lib/check-req-fields.js')
const postReqFields = reqFieldChecker([
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum'
])

//HOME
app.get('/', function(req, res, next) {
  res.send('Welcome to the fanciest museum ever.')
})

//POST a painting (Crudls)
app.post('/', function(req, res, next) {
  const missingFields = postReqFields(req.body)

  if (not(isEmpty(missingFields))) {
    new HTTPError(400, `Missing Fields: ${join(' ', postReqFields(req.body))}`)
  }

  createPainting(req.body, function(err, createdPainting) {
    if (err) {
      next(err.status, err.message, err)
      return
    }
    res.status(201).send(createdPainting)
    return
  })
})

//GET a painting (cRudls)

//PUT to update a painting (crUdls)

//DELETE to delete a painting (cruDls)

//GET to list and search paintings (crudLS)

//ERROR HANDLER
app.use(function(err, req, res, next) {
  console.log('ERROR!', err)
  res.status(err.status || 500)
  res.send(err.message)
})

//PORT LISTENER
app.listen(port, () => console.log('The museum is open at port', port))
