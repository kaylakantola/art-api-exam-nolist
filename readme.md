# Art Museum API

The Art Museum API tracks various `/paintings` and their `/artists`. It is a RESTful HTTP based API using JSON to represent the paintings and artists.

## Getting Started

I'm so glad you've decided to use this API to keep track of paintings and artists!

First thing's first, let's **clone the repo** and **install dependencies**!

Open up your terminal and get into your code home directory. Then, issue the following commands:

```
git clone https://github.com/kaylakantola/art-api-exam-nolist.git
cd art-api-exam-nolist
npm install
```

This should pull the project down onto your machine and install the dependencies. Open up your favorite code editor, navigate to your code home folder, and open up the art-api-exam-nolist project.

Now it's time to **create a database**.
If you're unsure of how to do this, I suggest reading CouchDB's [Getting Started](http://docs.couchdb.org/en/2.1.1/intro/tour.html) guide.

Once you've set up your database, make note of the **key**, **secret** and **url**.

Go back into your code editor and add a `.env` file. Within that file, add the following:

```
PORT=4000
COUCHDB_URL=https://key:secret@(your db url here, minus the "https://")
```

Now it's time to **load your data**. Navigate to the file called `load-data.js`.

You'll see an array of JSON objects representing the data.

Go to your terminal and issue the following command:
`npm run load`

Voila! The objects should now be in your database.

Let's **get this party started**! In the terminal, type:

```
npm start
```

The terminal should tell you what port to go to - likely 4000. Go to your favorite browser and enter in "localhost:4000/". You should receive back a message in the browser saying "Welcome to the fanciest museum ever."

Now let's **make our first `/GET` call** within the browser. In the browser, type:

```
http://localhost:4000/paintings/painting_bal-du-moulin-de-la-galette
```

You should receive back:

```
{
"name": "Bal du moulin de la Galette",
"type": "painting",
"movement": "impressionism",
"artist": "Pierre-Auguste Renoires",
"yearCreated": "1876",
"museum": {
"name": "Musée d’Orsay",
"location": "Paris"
},
"_id": "painting_bal-du-moulin-de-la-galette",
"_rev": "1-20d3af18c5f14c6e92e4c62b38265ed7"
}
```

Hooray! I deem thee started!
