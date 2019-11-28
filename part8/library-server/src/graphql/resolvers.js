const { UserInputError } = require('apollo-server')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { checkAuth } = require('../utils/helpers')
const Author = require('../models/author')
const Book = require('../models/book')
const User = require('../models/user')

const addBook = async (parent, args, context) => {
  checkAuth(context.currentUser)

  let authorId
  const existingAuthor = await Author.findOne({ name: args.author.name })
  if (existingAuthor) {
    authorId = existingAuthor.id
  } else {
    const newAuthor = new Author({ ...args.author })
    try {
      const savedAuthor = await newAuthor.save()
      authorId = savedAuthor.id
    } catch(error) {
      throw new UserInputError(error.message, { invalidArgs: args })
    }
  }
  const book = new Book({ ...args, author: authorId })
  try {
    const savedBook = await book.save()
    return savedBook.populate('author').execPopulate()
  } catch(error) {
    throw new UserInputError(error.message, { invalidArgs: args })
  }
}

const allBooks = (parent, args) => Book.find({}).populate('author').then(books => books
  .filter(book => !args.author ? true : args.author === book.author.name)
  .filter(book => !args.genre ? true : book.genres.some(genre => genre === args.genre))
)

const editAuthor = async (parent, args, context) => {
  checkAuth(context.currentUser)

  const author = await Author.findOneAndUpdate(
    { name: args.name },
    { born: args.setBornTo },
    { new: true }
  )
  return author
}

const createUser = async (parent, args) => {
  const { username, favoriteGenre, password } = args

  if (password.length < 3) {
    throw new UserInputError('password must be minimum of 3 characters')
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    favoriteGenre,
    passwordHash
  })

  try {
    return await user.save()
  } catch(error) {
    throw new UserInputError(error.message, { invalidArgs: args })
  }
}

const login = async (parent, args) => {
  const { username, password } = args
  const user = await User.findOne({ username })
  const passwordIsMatching = user && await bcrypt.compare(password, user.passwordHash)

  if ( !user || !passwordIsMatching ) {
    throw new UserInputError('username or password is wrong')
  }

  const payload = {
    username: user.username,
    id: user.id
  }

  return { value: jwt.sign(payload, config.JWT_SECRET) }
}

module.exports = {
  Author: {
    bookCount: parent => Book.find({ author: parent.id }).then(books => books.length)
  },
  Mutation: {
    addBook,
    createUser,
    editAuthor,
    login,
  },
  Query: {
    hello: () => { return 'world ' + new Date },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks,
    allAuthors: () => Author.find({}),
    me: (parent, args, context) => context.currentUser
  }
}
