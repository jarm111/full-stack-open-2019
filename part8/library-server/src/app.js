
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
require('./utils/dbConnection')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

module.exports = server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
