require('dotenv').config()

module.exports = Object.freeze({
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET
})