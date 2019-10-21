const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const passwordIsMatching = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false

  if (!user || !passwordIsMatching) {
    return res.status(401).json({
      error: 'username or password is wrong'
    })
  }

  const payload = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(payload, config.SECRET)

  res.json({
    token,
    username: user.username,
    name: user.name
  })
})

module.exports = loginRouter
