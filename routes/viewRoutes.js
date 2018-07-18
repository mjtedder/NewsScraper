// DEPENDENCIES====================================================
// Tell app where to look for mongoDBs
var db = require('../models')

module.exports = function(app) {

// A route for getting all Articles from the db
  app.get('/', function(req, res) {
    db.Article.find({}, function(error, data) {
      if (error) console.log('error getting articles', error)
      res.render('index', {article: data})
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
