const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test-helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('when creating new user', () => {
  test('a valid user can be created', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'sam',
      name: 'Samuel Ortiz',
      password: 'asdf1234'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /json/)

    const usersAfter = await helper.usersInDb()
    const userNames = usersAfter.map(u => u.username)

    expect(usersAfter.length).toBe(usersBefore.length + 1)
    expect(userNames).toContain(newUser.username)
  })

  test('it fails with username already exists', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'eddy',
      name: 'Ed Ozz',
      password: 'asdf1234'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAfter = await helper.usersInDb()

    expect(usersAfter.length).toBe(usersBefore.length)
  })

  test('it fails with username too short', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'ed',
      name: 'Ed Ozz',
      password: 'asdf1234'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)

    expect(result.body.error).toContain('username: must be minimum of')

    const usersAfter = await helper.usersInDb()

    expect(usersAfter.length).toBe(usersBefore.length)
  })

  test('it fails with username missing', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      name: 'Ed Ozz',
      password: 'asdf1234'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)

    expect(result.body.error).toContain('username: is required')

    const usersAfter = await helper.usersInDb()

    expect(usersAfter.length).toBe(usersBefore.length)
  })

  test('it fails with password too short', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'ed',
      name: 'Ed Ozz',
      password: 'oi'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)

    expect(result.body.error).toContain('password: must be minimum of')

    const usersAfter = await helper.usersInDb()

    expect(usersAfter.length).toBe(usersBefore.length)
  })

  test('it fails with password missing', async () => {
    const usersBefore = await helper.usersInDb()

    const newUser = {
      username: 'ed',
      name: 'Ed Ozz',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/)

    expect(result.body.error).toContain('password: is required')

    const usersAfter = await helper.usersInDb()

    expect(usersAfter.length).toBe(usersBefore.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})