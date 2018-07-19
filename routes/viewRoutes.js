// DEPENDENCIES====================================================
// Tell app where to look for mongoDBs
const db = require('../models')
const Comment = require('../models/Comment.js')
var methodOverride = require("method-override")


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
    db.Article.find({saved: true}).populate("comment").exec(function(err, data) {
      console.log('TEST')
      console.log(data)
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
  // Post route for saving a note to an article
  app.post('/saved/comments/:id', function(req, res) {
    db.Comment.create(req.body)
      .then(function(dbComment) {
        return db.Article.findOneAndUpdate({_id: req.params.id}, { comment: dbComment._id }, {new: true})
      })
        .then(function(dbArticle) {
            res.redirect('/saved')
        })
    })
  // Delete route to delete a comment
  app.post('/saved/delete/:id', function(req, res) {
    db.Comment.remove({_id: req.params.id})
    .then(function(err, data) {
        res.redirect('/saved')
    })
  })
}
