// const uuid = require('uuid/v1')
const Author = require('../models/author')
const Book = require('../models/book')
// let { authors, books } = require('../utils/mockData')


module.exports = {
  // Author: {
  //   bookCount: parent => books.filter(book => parent.name === book.author).length
  // },
  Mutation: {
    addBook: async (parent, args) => {
      let authorId
      const existingAuthor = await Author.findOne({ name: args.author.name })
      if (existingAuthor) {
        authorId = existingAuthor.id
      } else {
        const newAuthor = new Author({ ...args.author })
        const savedAuthor = await newAuthor.save()
        authorId = savedAuthor.id
      }
      const book = new Book({ ...args, author: authorId })
      const savedBook = await book.save()
      return savedBook.populate('author').execPopulate()
    },
    // editAuthor: (parent, args) => {
    //   const author = authors.find(author => author.name === args.name)
    //   if (!author) {
    //     return null
    //   }
    //   const editedAuthor = { ...author, born: args.setBornTo }
    //   authors = authors.map(author => author.id === editedAuthor.id ? editedAuthor : author)
    //   return editedAuthor
    // }
  },
  Query: {
    hello: () => { return 'world ' + new Date },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => Book.find({}).populate('author'),
    // allBooks: (parent, args) => Book.find({})
    //   .filter(book => !args.author ? true : args.author === book.author)
    //   .filter(book => !args.genre ? true : book.genres.some(genre => genre === args.genre)),
    allAuthors: () => Author.find({}),
  }
}
