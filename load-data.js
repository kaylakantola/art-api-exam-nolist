require('dotenv').config()
const PouchDB = require('pouchdb-core')
PouchDB.plugin(require('pouchdb-adapter-http'))
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB(process.env.COUCHDB_URL)

db
  .bulkDocs([
    {
      _id: 'painting_starry-night',
      name: 'The Starry Night',
      type: 'painting',
      movement: 'post-impressionism',
      artist: 'Vincent van Gogh',
      yearCreated: '1889',
      museum: { name: 'Museum of Modern Art', location: 'New York' }
    },
    {
      _id: 'painting_water-lilies-nympheas',
      name: 'Water Lilies Nympheas',
      type: 'painting',
      movement: 'impressionism',
      artist: 'Claude Monet',
      yearCreated: '1907',
      museum: { name: 'Art Gallery of Ontario', location: 'Toronto' }
    },
    {
      _id: 'painting_last-supper',
      name: 'The Last Supper',
      type: 'painting',
      movement: 'Renaissance',
      artist: 'Leonardo da Vinci',
      yearCreated: '1495',
      museum: { name: 'Santa Maria delle Grazie', location: 'Milan' }
    },
    {
      _id: 'painting_sunday-afternoon-on-the_island-of-la-grande-jatte',
      name: 'A Sunday Afternoon on the Island of La Grande Jatte',
      type: 'painting',
      movement: 'impressionism',
      artist: 'Georges Seurat',
      yearCreated: '1884',
      museum: { name: 'Art Institute of Chicago', location: 'Chicago' }
    },
    {
      _id: 'painting_guernica',
      name: 'Guernica',
      type: 'painting',
      movement: 'surrealism',
      artist: 'Pablo Picasso',
      yearCreated: '1937',
      museum: {
        name: 'Museo Nacional Centro de Arte Reina Sofía',
        location: 'Madrid'
      }
    },
    {
      _id: 'painting_bal-du-moulin-de-la-galette',
      name: 'Bal du moulin de la Galette',
      type: 'painting',
      movement: 'impressionism',
      artist: 'Pierre-Auguste Renoires',
      yearCreated: '1876',
      museum: { name: 'Musée d’Orsay', location: 'Paris' }
    },
    {
      _id: 'artist_pierre-auguste-renoires',
      name: 'Pierre-Auguste Renoires',
      movement: 'impressionism',
      type: 'artist'
    },
    {
      _id: 'artist_pablo-picasso',
      name: 'Pablo Picasso',
      movement: 'surrealism',
      type: 'artist'
    },
    {
      _id: 'artist_georges-seurat',
      name: 'Georges Seurat',
      movement: 'impressionism',
      type: 'artist'
    },
    {
      _id: 'artist_leonardo-da-vinci',
      name: 'Leonardo da Vinci',
      movement: 'renaissance',
      type: 'artist'
    },
    {
      _id: 'artist_claude-monet',
      name: 'Claude Monet',
      movement: 'impressionism',
      type: 'artist'
    },
    {
      _id: 'artist_vincent-van-gogh',
      name: 'Vincent Van Gogh',
      movement: 'post-impressionism',
      type: 'artist'
    },
    {
      _id: 'artist_frida-kahlo',
      name: 'Frida Kahlo',
      movement: 'surrealism',
      type: 'artist'
    }
  ])
  .then(resp => {
    console.log(resp)
  })
  .catch(err => {
    console.log(err)
  })
