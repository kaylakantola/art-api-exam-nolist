//REQUIREMENTS
require('dotenv').config() //connects to .env
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const pkGen = require('./lib/pk-generator.js') //generates unique id
const HTTPError = require('node-http-error')
const { pluck } = require('ramda')
const db = new PouchDB(process.env.COUCHDB_URL) // most important, this is how you talk to your database!

//POST a painting (Crudls)
const createPainting = function(painting, cb) {
  const newName = pkGen(painting.name)
  painting._id = `painting_${newName}`
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
const getPaintings = options =>
  db.allDocs(options).then(result => pluck('doc', result.rows))

//POST an artist (Crudls)
const createArtist = function(artist, cb) {
  const name = pkGen(artist.name)
  artist._id = `artist_${name}`
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
const getArtists = options =>
  db.allDocs(options).then(result => pluck('doc', result.rows))

//EXPORT IT OUT
const dal = {
  createPainting,
  getPainting,
  updatePainting,
  deletePainting,
  getPaintings,
  createArtist,
  getArtist,
  updateArtist,
  deleteArtist,
  getArtists
}

module.exports = dal
