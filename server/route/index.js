const authRouter = require('./auth')
const { notFound, errorHanler } = require('../middlewares/error')

const initAuthRoute = (app) => {
  app.use('/api/auth', authRouter)

  app.use(notFound)
  app.use(errorHanler)
}

module.exports = initAuthRoute
