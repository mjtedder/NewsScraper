let mongoose = require('mongoose')

let Schema = mongoose.Schema

let ArticleSchema = new Schema({
  // 'headline' is required and of type String
  headline: {
    type: String,
    required: true
  },
  // 'summary' is required and of type String
  summary: {
    type: String,
    required: true
  },
  // 'url' is required and of type String
  url: {
    type: String,
    required: true
  },
  // 'comment' is an object that stores a comment id
  // The ref property links the ObjectId to the Comment model
  // This allows us to populate the Article with an associated Comment
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }
})

//This creates our model from the above schema, using mongoos'e model method
let Article = mongoose.model('Article', ArticleSchema)

//Export the Article model
module.exports = Article
