const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test-helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('GET /api/blogs', () => {
  it('returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  it('returns all the blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  it('returns blogs that one of them has a spesific title', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)

    expect(titles).toContain('Canonical string reduction')
  })

  it('returns blogs with id field defined', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body

    blogs.forEach(b => expect(b.id).toBeDefined())
  })
})

afterAll(() => {
  mongoose.connection.close()
})