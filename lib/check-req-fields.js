const { difference, keys } = require('ramda')

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

const fieldChecker = (requiredFields, data) =>
  difference(requiredFields, keys(data))

const reqFieldChecker = (data, method) => {
  if (method === POST && data === 'painting') {
    const missingFields = fieldChecker(postPaintingReqFields, data)
    if (not(isEmpty(missingFields))) {
      next(new HTTPError(400, `Missing Fields: ${join(', ', missingFields)}`))
      return
    }
    return
  } else if (method === POST && data === 'artist') {
    const missingFields = fieldChecker(postartistReqFields, data)
    if (not(isEmpty(missingFields))) {
      next(new HTTPError(400, `Missing Fields: ${join(', ', missingFields)}`))
      return
    }
    return
  } else if (method === PUT && data === 'painting') {
    const missingFields = fieldChecker(putPaintingReqFields, data)
    if (not(isEmpty(missingFields))) {
      next(new HTTPError(400, `Missing Fields: ${join(', ', missingFields)}`))
      return
    }
    return
  } else if (method === PUT && data === 'artist') {
    const missingFields = fieldChecker(putArtistReqFields, data)
    if (not(isEmpty(missingFields))) {
      next(new HTTPError(400, `Missing Fields: ${join(', ', missingFields)}`))
      return
    }
    return
  }
  return
}

module.exports = reqFieldChecker
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
