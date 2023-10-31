const router = require('express').Router()
const controllers = require('../../controllers/user')
const { verifyAccessToken } = require('../../middlewares/jwt')

router.get('/profile', verifyAccessToken, controllers.getUserProfile)

module.exports = router
