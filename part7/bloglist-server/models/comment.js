const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Comment', commentSchema)