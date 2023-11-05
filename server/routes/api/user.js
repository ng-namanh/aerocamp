const router = require('express').Router()
const controllers = require('../../controllers/user')
const { authentication } = require('../../middlewares/jwt')

router.get('/profile', authentication, controllers.getUserProfile)

module.exports = router
