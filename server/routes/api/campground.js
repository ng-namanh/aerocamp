const router = require('express').Router()
const controllers = require('../../controllers/campground.js')
const { verifyAccessToken } = require('../../middlewares/jwt')

router.post('/create', verifyAccessToken, controllers.createCampground)

module.exports = router
