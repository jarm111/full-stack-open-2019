const { AuthenticationError } = require('apollo-server')

exports.checkAuth = currentUser => {
  if (!currentUser) {
    throw new AuthenticationError('not authenticated')
  }
}