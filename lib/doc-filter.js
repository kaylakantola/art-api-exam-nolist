const { pathOr, head, split, last, filter } = require('ramda')

function docFilter(req, res) {
  var filterFn = null
  if (pathOr(null, ['query', 'q'], req)) {
    const filterProp = head(split(':', req.query.q))
    const filterValue = last(split(':', req.query.q))

    filterFn = docs =>
      res.status(200).send(filter(doc => doc[filterProp] == filterValue, docs))
  } else {
    filterFn = docs => res.status(200).send(docs)
  }
  return filterFn
}

module.exports = docFilter
