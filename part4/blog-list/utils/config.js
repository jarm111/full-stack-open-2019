/* globals process */

require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT
const MONGODB_URL = NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL

module.exports = {
  MONGODB_URL,
  PORT,
  NODE_ENV
}