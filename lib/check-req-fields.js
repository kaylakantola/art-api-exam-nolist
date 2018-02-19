const { difference, keys } = require('ramda')

module.exports = requiredFields => data =>
  difference(requiredFields, keys(data))
/* This takes in the data, looks at what the props are on it.
Compares that against “requiredFields”, which is an array you’ll put
into the api.js to dictate what fields are required when someone does a
POST or PUT.
*/
