//REQUIREMENTS
require('dotenv').config() //connects to .env
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const HTTPError = require('node-http-error') //error handler, yay!
const db = new PouchDB(process.env.COUCHDB_URL) // most important, this is how you talk to your database!
const articleKiller = require('./lib/name-adjust.js')

//POST a painting (Crudls)
const createPainting = function(painting, cb) {
  const name = articleKiller(painting.name)
  painting._id = `painting_${name}`
  db.put(painting, cb)
}
//GET a painting (cRudls)

//PUT to update a painting (crUdls)

//DELETE to delete a painting (cruDls)

//GET to list and search paintings (crudLS)

const dal = { createPainting }

module.exports = dal
