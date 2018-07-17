// DEPENDENCIES====================================================
// Tell app where to look for mongoDBs
let db = require('../models')

module.exports = app => {

// Index page
  app.get('/', function(req, res) {
    res.send('Hello World')
  })

// A route for getting all Articles from the db
  app.get('/articles', function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle)
      })
      .catch(function(err) {
        res.json(err)
      })
  })
// A route for grabbing a specific Article by id, populate it with its comment.
  app.get('/articles/:id', function(req,res) {
    db.Article.findOne({ _id: req.params.id })
      .populate('comment')
      .then(function(dbArticle) {
        res.json(dbArticle)
      })
      .catch(function(err) {
        res.json(err)
      })
  })
}
// A route for saving/updating an Article's associated Note
