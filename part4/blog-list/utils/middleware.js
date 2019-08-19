const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'requested resource cannot be found' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}
