# Art Reference

Create a RESTful api that helps to manage a list of art information. Include scripts to load _all_ your data. Provide developer documentation to minimize on-boarding friction. This is an "open book" test. Use all your resouces including previous repos, videos, online guides, etc. for assistance. However, communication with other students verbally or electronically is not permitted.

> READ THESE INSTRUCTIONS TWICE. READ THESE INSTRUCTIONS CAREFULLY.

## Getting Started

1. Fork the repo

Sign in to your GitHub account and fork the following repo to your account:

```
https://github.com/jrs-innovation-center/art-api-exam-nolist
```

2. Clone your fork

Clone your fork to your local machine and install the project's dependencies.

```
$ git clone <url>
$ cd art-api-exam-nolist
$ npm install
```

## Instructions and Grading Scale

Your test will be graded using the following grading scale:

* Successfully complete the first 5 steps to receive a grade of 'Meets Expectations'.
* Complete the first 6 steps to receive a grade of 'Exceeds Expectations'.
* Complete all the steps to receive a grade of 'Outstanding'.

## Deadline

* You have until Monday at 12 p.m. to complete the test.
* Send your instructor a _direct message_ containing your repo url before the exam deadline.

## Step 1

* Using the existing file named **load-data.js**, create a program that adds the following paintings into a CouchDB database named `<your first name>Art`. Ex: `TripArt`:

  > Hint: https://pouchdb.com/api.html#batch_create

* Create an npm script named `load` that runs your **load-data.js** program.
* Test this program by running `npm run load` from your terminal.

  If you're interacting with CouchDB within IBM Bluemix/Cloudant or Roo, remember to keep your API key and password (secret) safe. Do not share on GitHub.

  ```
  [
    {
      "_id": "painting_starry-night",
      "name": "The Starry Night",
      "type": "painting",
      "movement": "post-impressionism",
      "artist": "Vincent van Gogh",
      "yearCreated": 1889,
      "museum": {name: "Museum of Modern Art", location: "New York"}
    },
    {
      "_id": "painting_water-lilies-nympheas",
      "name": "Water Lilies Nympheas",
      "type": "painting",
      "movement": "impressionism",
      "artist": "Claude Monet",
      "yearCreated": 1907,
      "museum": {name: "Art Gallery of Ontario", location: "Toronto"}
    },
    {
      "_id": "painting_last-supper",
      "name": "The Last Supper",
      "type": "painting",
      "movement": "Renaissance",
      "artist": "Leonardo da Vinci",
      "yearCreated": 1495,
      "museum": {name: "Santa Maria delle Grazie", location: "Milan"}
    },
    {
      "_id": "painting_sunday-afternoon-on-the_island-of-la-grande-jatte",
      "name": "A Sunday Afternoon on the Island of La Grande Jatte",
      "type": "painting",
      "movement": "impressionism",
      "artist": "Georges Seurat",
      "yearCreated": 1884,
      "museum": {name: "Art Institute of Chicago", location: "Chicago"}
    },
    {
      "_id": "painting_guernica",
      "name": "Guernica",
      "type": "painting",
      "movement": "surrealism",
      "artist": "Pablo Picasso",
      "yearCreated": 1937,
      "museum": {name: "Museo Nacional Centro de Arte Reina Sofía", location: "Madrid"}
    },
    {
      "_id": "painting_bal-du-moulin-de-la-galette",
      "name": "Bal du moulin de la Galette",
      "type": "painting",
      "movement": "impressionism",
      "artist": "Pierre-Auguste Renoires",
      "yearCreated": 1876,
      "museum": {name: "Musée d’Orsay", location: "Paris"}
    }
  ]
  ```

## Step 2

Review the information below and create the described functionality.

> Your api should run on port 4000.

## Create a painting

```
POST  /paintings
```

Creates a painting. The request body must contain a JSON object that represents the painting being created. The request body must include the `name`, `movement`, `artist`, `yearCreated`, and `museum` fields.

* Use the `type` and `name` fields in the creation of the `_id` value.
* **DO NOT ALLOW** the articles "a" or "the" in the beginning of the name for the primary key value.
* Slugify the `name` field.

> In the example below the name of the painting to create is "The Persistence of Memory". When created the painting should have a primary key value of `_id: "painting_persistence-of-memory"`

**Sample Request**

```
POST /paintings
```

**Sample Request Body JSON Data**

```
{
  "name": "The Persistence of Memory",
  "movement": "surrealism",
  "artist": "Salvador Dali",
  "yearCreated": 1931,
  "museum": {name: "Musuem of Modern Art", location: "New York"}
}
```

**Sample Response (your `rev` values will vary)**

```
{
  "ok": true,
  "id": "painting_persistence-of-memory",
  "rev": "1-c617189487fbe325d01cb7fc74acf45b"
}
```

## Retrieve a painting

`GET /paintings/{id}`

Retrieves a specific painting as identified by the `{id}` route parameter.

**Sample Request**

```
GET /paintings/painting_bal-du-moulin-de-la-galette
```

**Sample Response**

```
{
  "_id": "painting_bal-du-moulin-de-la-galette",
  "_rev": "1-c617189487fbe325d01cb7fc74acf45b",
  "name": "Bal du moulin de la Galette",
  "type": "painting",
  "movement": "impressionism",
  "artist": "Pierre-Auguste Renoires",
  "yearCreated": 1876,
  "museum": {name: "Musée d’Orsay", location: "Paris"}
}
```

## Update a painting

`PUT /paintings/{id}`

Updates a specific painting as identified by the `{id}` route parameter. The request body must contain a JSON object that represents the painting being updated. The request body must include the `_id`, `_rev`, `name`, `movement`, `artist`, `yearCreated`, and `museum` fields. Not providing the most recent `_rev` value will cause an `409 - conflict` error to occur.

**Sample Request**

```
PUT /paintings/painting_bal-du-moulin-de-la-galette
```

**Sample Request Body JSON Data**

```
{
  "_id": "painting_bal-du-moulin-de-la-galette",
  "_rev": "1-c617189487fbe325d01cb7fc74acf45b",
  "name": "Bal du moulin de la Galette",
  "type": "painting",
  "movement": "impressionism",
  "artist": "Pierre-Auguste Renoires",
  "yearCreated": 1877,
  "museum": {name: "Musée d’Orsay", location: "Paris"}
}
```

**200 Sample Response**

```
{
  "ok": true,
  "id": "painting_bal-du-moulin-de-la-galette",
  "rev": "2-7e9b8cac710e70bfe0bef2de7bb3cfdb"
}
```

## Delete a painting

`DELETE /paintings/{id}`

Deletes a specific painting as identified by the `{id}` route parameter.

**200 Sample Request**

```
DELETE /paintings/painting_bal-du-moulin-de-la-galette
```

**Sample Response**

```
{
    "ok": true,
    "id": "painting_bal-du-moulin-de-la-galette",
    "rev": "3-fdd7fcbc62477372240862772d91c88f"
}
```

## Step 3 - Getting Started Documentation

Create developer on-boarding instructions by creating a **README.md** file. Include the following sections.

### Getting Started

Within the **Getting Started** section of the readme provide guidance on how to:

* Create a database
* Clone your repo
* Install dependencies
* Establish environment variables such as key and secrets to create a database url
* Load your data.
* Start the API
* Make your first `GET` call within the browser.

## Step 4 - Basics documentation

Within your readme, include a **Basics** section containing the following sections:

> Hint: https://apidocs.sky.blackbaud.com/docs/basics/

* Base URL - All endpoints within the paintings are located at the following base URL
* Scheme - what scheme does your api support?
* HTTP Verbs - what verbs does your api support? How does each verb relate to each of the routes for your entities, such as paintings?
* Content Types
* Response Status Codes - Include a listing of common successful and error status codes that a developer could encounter with _your API_. For example, what causes a painting not to be found? What causes a resource conflict when updating or adding a painting? What causes a bad request? See the section titled **Response status codes** in SKY API Docs [Basics](https://apidocs.sky.blackbaud.com/docs/basics/)

  For each status code include:

* the status code
* a description of the status code

### Step 5 - Artist CRUD

Enhance the api by supporting the ability to create, read, update, and delete artists.

* `POST /artists`
* `GET /artists/{id}`
* `PUT /artists/{id}`
* `DELETE /artists/{id}`

> Don't forget to modify your load data script to load in the artist data, too.

## Step 6 - Share code within libraries

> Tip: You may want to consider creating a new "feature" branch to help manage the changes to your code. When the code within the branch is stable, you can merge the branch into the master branch. After merging, delete the "feature" branch.

Within the **lib** folder, refactor the following functionality into library files.

* **\lib\pk-generator.js** - Create a common primary key generator function. Export the function from the NodeJS module. Refactor your code to utilize the function.

* **\lib\check-required-fields.js** - Create a function that checks the data within the incoming request body for both POSTs and PUTs. The function should accepts 3 parameters/arguments:

  * HTTP Verb
  * An array of required fields/keys
  * An object containing request body

  The function should return an empty array if all required fields are present within the request body. Otherwise, return an array of missing fields. Export the function from the NodeJS module. Refactor your code to utilize the function.

## Step 7 - List paintings

> Tip: You may want to consider creating a new "feature" branch to help manage the changes to your code. When the code within the branch is stable, you can merge the branch into the master branch. After merging, delete the "feature" branch.

```
GET /paintings
```

Returns a collection of paintings sorted by painting name. An optional `limit` query parameter provides a limit on the number of objects returned. Default `limit` value is 5.

> Hint: Consider using either `options` within [allDocs()](https://pouchdb.com/api.html#batch_fetch) or Ramda to provide the limit functionality.

**Examples**

* `GET /paintings?limit=2` returns an JSON array of 2 paintings.

  **Sample Response**

  ```
  [
    {
      "_id": "painting_bal-du-moulin-de-la-galette",
      "_rev": "5-2bac91fbd33b6612e4ea7da0552c91ca",
      "name": "Bal du moulin de la Galette",
      "type": "painting",
      "movement": "impressionism",
      "artist": "Pierre-Auguste Renoires",
      "yearCreated": 1876,
      "museum": {
          "name": "Musée d’Orsay",
          "location": "Paris"
      }
    },
    {
      "_id": "painting_guernica",
      "_rev": "5-a8b803395d7cb6154f63c627571a5575",
      "name": "Guernica",
      "type": "painting",
      "movement": "surrealism",
      "artist": "Pablo Picasso",
      "yearCreated": 1937,
      "museum": {
          "name": "Museo Nacional Centro de Arte Reina Sofía",
          "location": "Madrid"
      }
    }
  ]
  ```

## Step 8 - Filter paintings

* Create a `filter` query parameter on the `GET /paintings` endpoint to provide flexible search capability.
* Provide the ability to filter paintings by name, movement, artist and year created.
* In your api url's query string, the `filter` query parameter may be used in conjunction with the `limit` query parameter.

> Hint: Consider using [Mango Queries](https://pouchdb.com/api.html#query_index) or Ramda to provide the filter.

**Example**

* Filter by movement and limit to five paintings

  ```
  GET /art/paintings?filter=movement:surrealism&limit=5
  ```

  **Sample Results**

  ```
  [
    {
        "_id": "painting_guernica",
        "_rev": "1-ccd60fb0ca42d879d048f083b95cfdcb",
        "name": "Guernica",
        "type": "painting",
        "movement": "surrealism",
        "artist": "Pablo Picasso",
        "yearCreated": 1937,
        "museum": {
            "name": "Museo Nacional Centro de Arte Reina Sofía",
            "location": "Madrid"
        }
    }
  ]
  ```
