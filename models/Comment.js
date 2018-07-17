let mongoose = require('mongoose')

// Save a reference to the Schema constructor
let Schema = mongoose.Schema

// Using the Schema constructor, create a new CommentSchema object
let CommentSchema = new Schema({
  // 'title' is of type String
  title: String,
  // 'body' is of type String
  body: String
})

// This creates our model from the above schema, using mongoose's model method
let Comment = mongoose.model('Comment', CommentSchema)

// Export the Comment model
module.exports = Comment
