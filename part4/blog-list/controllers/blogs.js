const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const blog = new Blog(req.body)
    const result = await blog.save()
    res.status(201).json(result)
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