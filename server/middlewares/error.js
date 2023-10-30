const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found!`)
  res.status(404)
  next(error)
}

const errorHanler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : response.statusCode
  return res.status(statusCode).json({
    success: false,
    message: error?.message
  })
}

module.exports = {
  notFound,
  errorHanler
}
