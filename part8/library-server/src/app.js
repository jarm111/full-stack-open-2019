const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const loaders = require('./graphql/loaders')
const config = require('./utils/config')
const User = require('./models/user')
require('./utils/dbConnection')

const context = async ({ req }) => {
  if (req) {
    const auth = req.headers.authorization
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser, loaders }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})

module.exports = server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
