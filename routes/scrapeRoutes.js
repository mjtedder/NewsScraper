// DEPENDENCIES===============================================
// Tells app where to look for models
let db = require('../models')

// Scraping tools
let axios = require('axios')
let cheerio = require('cheerio')

// A GET route for scraping the Reddit gaming news website
module.exports = function(app) {
  app.get('/scrape', (req, res) => {
    axios.get('https://www.denverpost.com/').then((response) => {
      let $ = cheerio.load(response.data)

      $('h4.entry-title').each((i, element) => {
        let result = {}

        result.headline = $(this).children('a.article-title').attr('title')
        result.summary = $('div.article-info').children('div.excerpt').text()
        result.url = $(this).children().attr('href')

        db.Article.create(result)
          .then((dbArticle) => {
            console.log(dbArticle)
          })
          .catch((err) => {
            return res.json(err)
          })
      })
      res.send("Scrape Complete")
    })
  })
}
