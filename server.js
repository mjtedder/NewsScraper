// Node packages
let express = require('express')
let exphb = require('express-handlebars')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let logger = require('morgan')

// Scraping tools
let axios = require('axios')
let cheerio = require('cheerio')

//Require all models
let db = require('./models')

let PORT = 8080

// Initialize express
let app = express()

// Configure middleware
// Use morgan logger for logging requests
app.use(logger('dev'))
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true}))
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'))

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// A GET route for scraping the news website

// A route for getting all Articles from the db

// A route for grabbing a specific Article by id, populate it with its comment.

// A route for saving/updating an Article's associated Note

// Start the server
app.listen(PORT, () => {
  console.log("App is running on port " + PORT + "!")
})
