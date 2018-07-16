// REQUIRED DEPENDENCIES========================================
require('dotenv').config()
let express = require('express')
let exphb = require('express-handlebars')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')

//Require all models
let db = require('./models')

let PORT = 8080

// Initialize express
let app = express()

// Configure middleware========================================

// Use morgan logger for logging requests
let logger = require('morgan')
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

// ROUTING ============================================================
require('./routes/scrapeRoutes.js')(app)
require('./routes/viewRoutes.js')(app)


// Start the server
app.listen(PORT, () => {
  console.log("App is running on port " + PORT + "!")
})
