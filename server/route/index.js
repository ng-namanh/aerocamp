const authRouter = require('./auth')

const initAuthRoute = (app) => {
  app.use('/api/auth', authRouter)
}

module.exports = initAuthRoute
