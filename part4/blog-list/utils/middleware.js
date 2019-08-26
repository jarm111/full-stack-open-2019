const logger = require('./logger')

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'requested resource cannot be found' })
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'id has invalid format' })
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  }

  logger.error(err.message)
  next(err)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}
