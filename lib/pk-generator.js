const { split, head, join, tail, toLower, compose, indexOf } = require('ramda')
const slugify = require('slugify')

const articleKiller = x => {
  const theName = compose(head, split(' '), toLower)(x)
  if (indexOf('the' || 'a', theName) > -1) {
    const newName = compose(slugify, toLower, join(' '), tail, split(' '))(x)
    return newName
  } else {
    return compose(slugify, toLower)(x)
  }
}

module.exports = articleKiller
