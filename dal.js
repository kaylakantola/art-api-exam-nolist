//REQUIREMENTS
require('dotenv').config() //connects to .env
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const HTTPError = require('node-http-error') //error handler, yay!
const slugify = require('slugify') //sweet, a slugify function!
const db = new PouchDB(process.env.COUCHDB_URL) // most important, this is how you talk to your database!

//POST a painting (Crudls)

//GET a painting (cRudls)

//PUT to update a painting (crUdls)

//DELETE to delete a painting (cruDls)

//GET to list and search paintings (crudLS)
