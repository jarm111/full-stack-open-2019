const Author = require('../models/author')
const Book = require('../models/book')

module.exports = {
  Author: {
    bookCount: parent => Book.find({ author: parent.id }).then(books => books.length)
  },
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
    editAuthor: async (parent, args) => {
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      )
      return author
    }
  },
  Query: {
    hello: () => { return 'world ' + new Date },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (parent, args) => Book.find({}).populate('author').then(books => books
      .filter(book => !args.author ? true : args.author === book.author.name)
      .filter(book => !args.genre ? true : book.genres.some(genre => genre === args.genre))
    ),
    allAuthors: () => Author.find({}),
  }
}
