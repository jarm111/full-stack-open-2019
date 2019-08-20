const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'requested resource cannot be found' })
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  logger.error(err.message)
  next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}
