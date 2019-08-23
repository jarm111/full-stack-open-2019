const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne()
    const { title, author, url, likes } = req.body

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