// DEPENDENCIES===============================================
// Handles requests
let request = require('request')
let bodyParser = require('body-parser')
// Tells app where to look for models
let db = require('../models')

// Scraping tools
let axios = require('axios')
let cheerio = require('cheerio')

module.exports = function(app) {
// A GET route for scraping the Denver Post news website
  app.get('/scrape', function(req, res) {
    axios.get('https://www.denverpost.com/').then(function(response) {
      let $ = cheerio.load(response.data)

      $('h4.entry-title').each(function(i, element)
      {
        let result = {}

        result.headline = $(this).children('a.article-title').attr('title')
        result.summary = $('div.article-info').children('div.excerpt').text()
        result.url = $(this).children().attr('href')
        console.log(result)
        db.Article.create(result)
          .then(function(dbArticle)  {
            console.log(dbArticle)
          })
          .catch(function(err) {
            return res.json(err)
          })
      })


      res.send("Scrape Complete")
    })
  })
}
