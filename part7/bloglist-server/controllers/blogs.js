const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const config = require('../utils/config')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  const { title, author, url, likes } = req.body
  const token = req.token

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
  const id = req.params.id

  try {
    const decodedPayload = jwt.verify(req.token, config.SECRET)
    const blog = await Blog.findById(id)
    if (blog.user.toString() !== decodedPayload.id.toString()) {
      return res.status(403).json({
        error: 'user has no rights to delete the blog'
      })
    }
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

blogsRouter.post('/:id/comments', async (req, res, next) => {
  try {
    const id = req.params.id
    const { content } = req.body

    const comment = new Comment({
      content,
      date: new Date()
    })

    const blogToUpdate = await Blog.findById(id)
    blogToUpdate.comments.push(comment)
    const updatedBlog = await blogToUpdate.save()
    res.status(201).json(updatedBlog)
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter