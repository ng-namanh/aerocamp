const router = require('express').Router()

const authRoutes = require('./auth')
const userRoutes = require('./user')
const campgroundRoutes = require('./campground')

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/campground', campgroundRoutes)

module.exports = router
