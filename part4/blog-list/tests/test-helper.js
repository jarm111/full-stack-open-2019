const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  }
]

const newBlogEntry = {
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
}

const newBlogEntryWithoutLikes = {
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
}

const newBlogEntryWithoutTitle = {
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 0,
}

const newBlogEntryWithoutAuthor = {
  title: 'Type wars',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 0,
}

const blogsInDb = async () => {
  return await Blog.find({})
}

const initialUsers = [
  { 'username':'eddy','name':'Edward Rodriquez','passwordHash':'$2b$10$x3h8L07amaOqViWSv9bsIOcltY4ZXM43rK4kft5hpd8Lf4cVO9Ngy' },
  { 'username':'tommy','name':'Thomas Bailey','passwordHash':'$2b$10$NSabTsg2qE18FgBvGWq21.MCivzjtKetgKXrlCaHPXLf90dzB3rGm' },
  { 'username':'olivia','name':'Olivia Day','passwordHash':'$2b$10$skYovCm7CRYdG8A3zcNgoObddhzniAG8nJuhoM0RQpNukcbtn4Cqi' }
]

const usersInDb = async () => {
  return await User.find({})
}

module.exports = {
  initialBlogs,
  blogsInDb,
  newBlogEntry,
  newBlogEntryWithoutLikes,
  newBlogEntryWithoutTitle,
  newBlogEntryWithoutAuthor,
  initialUsers,
  usersInDb
}