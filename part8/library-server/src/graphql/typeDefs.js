const { gql } = require('apollo-server')

module.exports = gql`
  input AuthorInput {
    name: String!
    born: Int
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: AuthorInput!
      genres: [String!]!
    ): Book
    createUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }
`
