const uuid = require('uuid/v1')
let { authors, books } = require('../utils/mockData')


module.exports = {
  Author: {
    bookCount: parent => books.filter(book => parent.name === book.author).length
  },
  Mutation: {
    addBook: (parent, args) => {
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      if (!authors.find(author => author.name === args.author)) {
        const newAuthor = { name: args.author, id: uuid() }
        authors = authors.concat(newAuthor)
      }
      return book
    },
    editAuthor: (parent, args) => {
      const author = authors.find(author => author.name === args.name)
      if (!author) {
        return null
      }
      const editedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(author => author.id === editedAuthor.id ? editedAuthor : author)
      return editedAuthor
    }
  },
  Query: {
    hello: () => { return 'world ' + new Date },
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (parent, args) => books
      .filter(book => !args.author ? true : args.author === book.author)
      .filter(book => !args.genre ? true : book.genres.some(genre => genre === args.genre)),
    allAuthors: () => authors
  }
}
