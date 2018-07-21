// REQUIRED DEPENDENCIES========================================
require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const request = require('request')
const methodOverride = require('method-override')

//Require all models
const db = require('./models')

const PORT = 8080

// Initialize express
const app = express()

// Set up the view engine for Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Configure middleware========================================

// Use morgan logger for logging requests
const logger = require('morgan')
app.use(logger('dev'))

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }))
// Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + '/public'));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
//const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

var databaseUri = "mongodb://localhost/mongoHeadlines"

/*if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect(databaseUri)
}*/

var mongoDB = "mongodb://heroku_dnkppg85:5og7dn3fgf8c8t49tqql5bk792@ds145911.mlab.com:45911/heroku_dnkppg85";

mongoose.connect(mongoDB);

var datab = mongoose.connection;

datab.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
//mongoose.Promise = Promise;
//);

// ROUTING ============================================================
// Set up an Express Router
const router = express.Router()
require('./routes/scrapeRoutes.js')(app)
require('./routes/viewRoutes.js')(app)


// Start the server
app.listen(PORT, () => {
  console.log("App is running on port " + PORT + "!")
})

if(process.env.NODE_ENV !== 'production') {
  process.once('uncaughtException', function(err) {
    console.error('FATAL: Uncaught exception.');
    console.error(err.stack||err);
    setTimeout(function(){
      process.exit(1);
    }, 100);
  });
}
