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

## Basics

### Base URL

All endpoints within the paintings are located at the following base URL:

```
http://localhost:4000/
```

### Scheme

This is a RESTful HTTP-based API using JSON to represent paintings and artists.

### HTTP Verbs & Endpoints

* `POST`
* `GET`
* `PUT`
* `DELETE`

The below explanation of endpoints use `/paintings` as the example. The same principles can also be applied to `/artists`, keeping in mind the required fields are different for artists.

#### POST - create a painting

Create a painting via a `POST` to the `/paintings` route, passing a painting JSON object in the request body.

All of the fields are required.

```
POST /paintings

{
  "name": "Bal du moulin de la Galette",
  "type": "painting",
  "movement": "impressionism",
  "artist": "Pierre-Auguste Renoires",
  "yearCreated": "1876",
  "museum": {
    "name": "Musée d’Orsay",
    "location": "Paris"
  }
}
```

A sucessfully created painting will result in a `201 - Created` response and the painting document will be returned in the response body. The response body will include the `ok status`, `id` and `rev` properties. See below.

```
{
"ok": true,
"id": "painting_bal-du-moulin-de-la-galette",
"rev": "1-5236adfa236asdf4352",
}
```

#### GET a specific painting

Get a specific painting via a `GET` to the `/paintings/:id` route, retrieving a painting from the database.

```
GET /paintings/painting_bal-du-moulin-de-la-galette
```

The only required field is the `_id`

A successful `GET` will result in a `200 - OK` response code and return a JSON object in the response body, representing the painting.

```
{
  "_id": "painting_bal-du-moulin-de-la-galette",
  "name": "Bal du moulin de la Galette",
  "type": "painting",
  "movement": "impressionism",
  "artist": "Pierre-Auguste Renoires",
  "yearCreated": "1876",
  "museum": {
    "name": "Musée d’Orsay",
    "location": "Paris"
  },
  "_rev": "1-20d3af18c5f14c6e92e4c62b38265ed7"
}
```

#### UPDATE a painting

Update a specific painting via a `PUT` to the `/paintings/:id` route, retrieving a painting from the database and submitting a JSON object in the request body. In the below example, we are updating "movement" to "surrealism".

Tip: Be sure to provide the most recent `_rev` value in the request body. Otherwise, you will receive a `409- conflict` error.

All the fields are required.

```
PUT /paintings/painting_bal-du-moulin-de-la-galette

{
  "_id": "painting_bal-du-moulin-de-la-galette",
  "name": "Bal du moulin de la Galette",
  "type": "painting",
  "movement": "surrealism",
  "artist": "Pierre-Auguste Renoires",
  "yearCreated": "1876",
  "museum": {
    "name": "Musée d’Orsay",
    "location": "Paris"
  },
  "_rev": "1-20d3af18c5f14c6e92e4c62b38265ed7"
}
```

A successful `PUT` will result an updated `_rev` and a `200 - OK` JSON object in the response body that reflects the changes in the request body (see below). It will return an `ok` status, `id` and a new `rev`. See below.

```
  {
  "ok": true,
  "id": "painting_bal-du-moulin-de-la-galette",
  "rev": "2-5236adfa236asdf4352",
  }
```

#### DELETE a painting

`DELETE` a specific painting via the `/paintings/:id` route, retrieving a painting from the database and deleting the JSON object.

```
DELETE /paintings/painting_bal-du-moulin-de-la-galette
```

The only required field is the `_id` because we are not using the request body.

A successful `DELETE` will result in a `204 - OK` response code and return a JSON object in the response body, representing the deleted painting

```
{
"_id": "painting_bal-du-moulin-de-la-galette",
"_rev": "1-5236adfa236asdf4352",
"deleted": true
}
```

### Content Types

The content types are `/paintings` and `/artists`.

###Response Status Codes

#### Successful status codes

**200 OK** - Occurs when you have completed a successful GET, PUT or DELETE.  
**201 Created** - Occurs when you have completed a successful POST.

#### Error status Codes

**400 Bad Request** - Occurs when you try to POST an object, but you have not included all required fields in the request body.
**404 Not Found** - Occurs when you try to GET an object that doesn't exist. Check to make sure the ID you entered is correct. Also occurs when you are trying to update an object with a PUT, but have not included the `_id` or `_rev`.
**409 Conflict error** - Occurs when you have tried to PUT to update an object, but you have `_rev` value that is not current in the request body. Try doing a GET on that object to see what the most current `_rev` is. This may also occur when you're trying to POST a new object, but you've included `_rev` or `_id` properties in the request body.
**500 Internal Server Error** - Dude, I'm so sorry, that's my bad. Shoot me an email and let me know - kayla@horriblemistakes.com.
