const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String
  },
  name: {
    type: String
  },
  passwordHash: {
    type: String
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)