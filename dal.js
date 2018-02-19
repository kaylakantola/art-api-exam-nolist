//REQUIREMENTS
require('dotenv').config() //connects to .env
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const HTTPError = require('node-http-error') //error handler, yay!
const db = new PouchDB(process.env.COUCHDB_URL) // most important, this is how you talk to your database!
const articleKiller = require('./lib/name-adjust.js')
const slugify = require('slugify')
const { toLower } = require('ramda')

//POST a painting (Crudls)
const createPainting = function(painting, cb) {
  const name = articleKiller(painting.name)
  painting._id = `painting_${name}`
  db.put(painting, cb)
}

//GET a painting (cRudls)
const getPainting = function(paintingId, cb) {
  db.get(paintingId, function(err, painting) {
    if (err) {
      cb(err)
    }
    cb(null, painting)
  })
}

//PUT to update a painting (crUdls)
const updatePainting = function(painting, cb) {
  db.put(painting, function(err, updatedPainting) {
    if (err) {
      cb(err)
      return
    }
    cb(null, updatedPainting)
  })
}

//DELETE to delete a painting (cruDls)
const deletePainting = function(paintingId, cb) {
  db.get(paintingId, function(err, painting) {
    if (err) {
      cb(err)
      return
    }
    db.remove(painting, function(err, painting) {
      if (err) {
        cb(err)
        return
      }
      cb(null, painting)
    })
  })
}

//GET to list and search paintings (crudLS)

//POST an artist (Crudls)
const createArtist = function(artist, cb) {
  artist._id = `artist_${slugify(toLower(artist.name))}`
  db.put(artist, cb)
}

//GET an artist (cRudls)
const getArtist = function(artistId, cb) {
  db.get(artistId, function(err, artist) {
    if (err) {
      cb(err)
    }
    cb(null, artist)
  })
}

//PUT to update an artist (crUdls)
const updateArtist = function(artist, cb) {
  db.put(artist, function(err, updatedArtist) {
    if (err) {
      cb(err)
      return
    }
    cb(null, updatedArtist)
  })
}

//DELETE to delete an artist (cruDls)
const deleteArtist = function(artistId, cb) {
  db.get(artistId, function(err, artist) {
    if (err) {
      cb(err)
      return
    }
    db.remove(artist, function(err, artist) {
      if (err) {
        cb(err)
        return
      }
      cb(null, artist)
    })
  })
}

//GET to list and search artists (crudLS)

const dal = {
  createPainting,
  getPainting,
  updatePainting,
  deletePainting,
  createArtist,
  getArtist,
  updateArtist,
  deleteArtist
}

module.exports = dal
