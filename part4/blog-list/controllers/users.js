const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const result = await User.find({})

  res.json(result)
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body
    if (!password) return res.status(400).json({ error: 'password: is required' })
    if (password.length < 3) return res.status(400).json({ error: 'password: must be minimum of 3 characters' })
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      username,
      name,
      passwordHash
    })

    const result = await newUser.save()

    res.json(result)
  } catch(error) {
    next(error)
  }
})

module.exports = usersRouter