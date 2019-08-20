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

describe('POST /api/blogs', () => {
  it('returns added blog as json with status of 201', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogEntry)
      .expect(201)
      .expect('Content-Type', /json/)
  })

  it('has number of blogs increased by one', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogEntry)

    const blogsAfterPost = await helper.blogsInDb()

    expect(blogsAfterPost.length).toBe(helper.initialBlogs.length + 1)
  })

  it('contains the title of created blog', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogEntry)

    const blogsAfterPost = await helper.blogsInDb()
    const titles = blogsAfterPost.map(b => b.title)

    expect(titles).toContain(helper.newBlogEntry.title)
  })

  it('has the new blog with likes set to 0 when likes is not defined', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogEntryWithoutLikes)

    const blogsAfterPost = await helper.blogsInDb()
    const newBlog = blogsAfterPost.find(b => b.title === helper.newBlogEntryWithoutLikes.title)

    expect(newBlog.likes).toBe(0)
  })

  it('returns 400 bad request when author is not defined', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogEntryWithoutAuthor)
      .expect(400)
  })

  it('returns 400 bad request when title is not defined', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogEntryWithoutTitle)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})