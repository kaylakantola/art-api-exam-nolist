//REQUIREMENTS
const { difference, keys, not, isEmpty } = require('ramda')
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')

//REQUIRED FIELDS ARRAYS
const postPaintingReqFields = [
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum',
  'type'
]
const putPaintingReqFields = [
  'name',
  'movement',
  'artist',
  'yearCreated',
  'museum',
  'type',
  '_id',
  '_rev'
]
const postArtistReqFields = ['name', 'movement', 'type']
const putArtistReqFields = ['name', 'movement', 'type', '_id', '_rev']

//FUN FUN FUNCTION
const fieldChecker = (requiredFields, data) =>
  difference(requiredFields, keys(data))

const paintingReqFieldChecker = (HTTPVerb, data) => {
  var fieldsArray = []
  if (HTTPVerb === 'POST') {
    const missingFields = fieldChecker(postPaintingReqFields, data)
    if (not(isEmpty(missingFields))) {
      fieldsArray.push(missingFields)
      return fieldsArray
    }
    return fieldsArray
  } else if (HTTPVerb === 'PUT') {
    const missingFields = fieldChecker(putPaintingReqFields, data)
    if (not(isEmpty(missingFields))) {
      fieldsArray.push(missingFields)
      return fieldsArray
    }
    return fieldsArray
  }
  return fieldsArray
}

const artistReqFieldChecker = (HTTPVerb, data) => {
  var fieldsArray = []
  if (HTTPVerb === 'POST') {
    const missingFields = fieldChecker(postArtistReqFields, data)
    if (not(isEmpty(missingFields))) {
      fieldsArray.push(missingFields)
      return fieldsArray
    }
    return fieldsArray
  } else if (HTTPVerb === 'PUT') {
    const missingFields = fieldChecker(putArtistReqFields, data)
    if (not(isEmpty(missingFields))) {
      fieldsArray.push(missingFields)
      return fieldsArray
    }
    return fieldsArray
  }
  return fieldsArray
}

module.exports = { paintingReqFieldChecker, artistReqFieldChecker }
/*
This takes in the data, looks at what the props are on it.
Compares that against “requiredFields”, which is an array you’ll put
into the api.js to dictate what fields are required when someone does a
POST or PUT.



* **\lib\check-required-fields.js** - Create a
function that checks the data within the incoming request
body for both POSTs and PUTs. The function should accepts 3 parameters/arguments:

  * HTTP Verb
  * An array of required fields/keys
  * An object containing request body

  The function should return an empty array if all required
  fields are present within the request body. Otherwise, return an array
  of missing fields. Export the function from the NodeJS module. Refactor
   your code to utilize the function.
   */
