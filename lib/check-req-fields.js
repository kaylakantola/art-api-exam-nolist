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

//FUN FUN FUNCTIONS
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
