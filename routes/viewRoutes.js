// DEPENDENCIES====================================================
// Tell app where to look for mongoDBs
var db = require('../models')

module.exports = function(app) {

// GET ROUTES =====================================================

  // A route for getting all Articles from the db
  app.get('/', function(req, res) {
    db.Article.find({}, function(error, data) {
      if (error) console.log('error getting articles', error)
      res.render('index', {article: data})
    })
  })

// This route renders the saved handlebars page
  app.get('/saved', function(req, res) {
    db.Article.find({saved: true}).populate('comments', 'body').exec(function(err, data) {
      if (err) {
        res.send(err)
      }
      else {
        res.render('saved', {saved: data})
      }
    })
  })

// POST ROUTES====================================================

  // Put route to update the article to be saved: true
  app.post('/saved/:id', function(req, res) {
    db.Article.update({_id: req.params.id}, {$set: {saved: true}}, function(err, data) {
      if (err) {
        res.send(err)
      }
      else {
        res.redirect('/')
      }
    })
  })
  // Delete route for articles on the saved page
  app.post('/delete/:id', function(req, res) {
    db.Article.update({_id: req.params.id}, {$set: {saved: false}}, function(err, data) {
      if(err) {
        res.send(err)
      }
      else {
        res.redirect('/saved')
      }
    })
  })
}
// A route for saving/updating an Article's associated Note
