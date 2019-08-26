const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  res.json(blogs)
})

const extractToken = req => {
  const authHeader = req.get('authorization')
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    return authHeader.substring(7)
  }
  return null
}

blogsRouter.post('/', async (req, res, next) => {
  const { title, author, url, likes } = req.body
  const token = extractToken(req)
  if (!token) return res.status(401).json({
    error: 'token is missing'
  })

  try {
    const decodedPayload = jwt.verify(token, config.SECRET)

    const user = await User.findById(decodedPayload.id)

    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
  } catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } catch(error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const { title, author, url, likes } = req.body
    const blog = {
      title,
      author,
      url,
      likes
    }
    const result = await Blog.findByIdAndUpdate(id, blog, { new: true })
    res.json(result)
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter