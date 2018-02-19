//REQUIREMENTS
require('dotenv').config() //connects api.js to your .env file
const express = require('express') //brings in express…
const app = express() //… and runs it.
const HTTPError = require('node-http-error') // hooray, a way to handle errors!
const bodyParser = require('body-parser') //brings in body-parser…
app.use(bodyParser.json()) //… and runs it.
const { propOr, not, isEmpty, indexOf, prop, join } = require('ramda')
const {
  createPainting,
  getPainting,
  updatePainting,
  deletePainting,
  createArtist,
  getArtist,
  updateArtist,
  deleteArtist
} = require('./dal')
const port = propOr(9999, 'PORT', process.env) //cool, now you have a port!
const reqFieldChecker = require('./lib/check-req-fields.js')
const postPaintingReqFields = reqFieldChecker([
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum'
])
const putPaintingReqFields = reqFieldChecker([
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum',
  '_id',
  '_rev'
])
const objClean = require('./lib/clean-obj')

//HOME
app.get('/', function(req, res, next) {
  res.send('Welcome to the fanciest museum ever.')
})

//POST a painting (Crudls)
app.post('/paintings/', function(req, res, next) {
  const missingFields = postPaintingReqFields(req.body)

  if (not(isEmpty(missingFields))) {
    next(new HTTPError(400, `Missing Fields: ${join(', ', missingFields)}`))
    return
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
app.get('/paintings/:id', (req, res, next) => {
  getPainting(req.params.id, function(err, painting) {
    if (err) {
      next(new HTTPError(err.status, err.message, err))
      return
    }
    res.status(200).send(painting)
    return
  })
})

//PUT to update a painting (crUdls)
app.put('/paintings/:id', (req, res, next) => {
  if (isEmpty(prop('body', req))) {
    next(new HTTPError(400, 'Missing request body'))
  }

  const bodyCleaner = objClean([
    'name',
    'movement',
    'artist',
    'yearCreated',
    'museum',
    '_id',
    '_rev'
  ])

  const cleanedBody = bodyCleaner(req.body)

  const missingFields = putPaintingReqFields(cleanedBody)

  if (not(isEmpty(missingFields))) {
    next(
      new HTTPError(
        400,
        `Request body missing these fields: ${join(',', missingFields)}`
      )
    )
    return
  }

  updatePainting(cleanedBody, function(err, updatedPainting) {
    if (err) {
      next(new HTTPError(err.status, err.message, err))
      return
    }
    res.status(200).send(updatedPainting)
  })
})

//DELETE to delete a painting (cruDls)
app.delete('/paintings/:id', (req, res, next) => {
  deletePainting(req.params.id, function(err, painting) {
    if (err) {
      next(new HTTPError(err.status, err.message, err))
      return
    }
    res.status(200).send(painting)
  })
})

//GET to list and search paintings (crudLS)

//POST an artist (Crudls)
app.post('/artists/', function(req, res, next) {
  const missingFields = postArtistReqFields(req.body)

  if (not(isEmpty(missingFields))) {
    next(new HTTPError(400, `Missing Fields: ${join(', ', missingFields)}`))
    return
  }

  createArtist(req.body, function(err, createdArtist) {
    if (err) {
      next(err.status, err.message, err)
      return
    }
    res.status(201).send(createdArtist)
    return
  })
})

//GET an artist (cRudls)
app.get('/artists/:id', (req, res, next) => {
  getArtist(req.params.id, function(err, artist) {
    if (err) {
      next(new HTTPError(err.status, err.message, err))
      return
    }
    res.status(200).send(artist)
    return
  })
})

//PUT to update an artist (crUdls)
app.put('/artists/:id', (req, res, next) => {
  if (isEmpty(prop('body', req))) {
    next(new HTTPError(400, 'Missing request body'))
  }

  const bodyCleaner = objClean([
    ///KAYLAAAaaAAaAAAA DONT FORGETTTT//
  ])

  const cleanedBody = bodyCleaner(req.body)

  const missingFields = putArtistReqFields(cleanedBody)

  if (not(isEmpty(missingFields))) {
    next(
      new HTTPError(
        400,
        `Request body missing these fields: ${join(',', missingFields)}`
      )
    )
    return
  }

  updateArtist(cleanedBody, function(err, updatedPainting) {
    if (err) {
      next(new HTTPError(err.status, err.message, err))
      return
    }
    res.status(200).send(updatedArtist)
  })
})

//DELETE to delete an artist (cruDls)
app.delete('/artists/:id', (req, res, next) => {
  deleteArtist(req.params.id, function(err, artist) {
    if (err) {
      next(new HTTPError(err.status, err.message, err))
      return
    }
    res.status(200).send(artist)
  })
})

//GET to list and search paintings (crudLS)

//ERROR HANDLER
app.use(function(err, req, res, next) {
  console.log('ERROR!', err)
  res.status(err.status || 500)
  res.send(err.message)
})

//PORT LISTENER
app.listen(port, () => console.log('The museum is open at port', port))
