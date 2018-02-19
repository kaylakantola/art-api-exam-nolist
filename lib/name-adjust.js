const { split, head, join, tail, toLower } = require('ramda')
const slugify = require('slugify')

const articleKiller = x => {
  if (head(split(' ', x)) === 'the' || 'a') {
    const newName = tail(split(' ', x))
    const joinedName = join(' ', newName)
    return slugify(toLower(joinedName))
  } else {
    return slugify(toLower(x))
  }
}

module.exports = articleKiller
