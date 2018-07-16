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
