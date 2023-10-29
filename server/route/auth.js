const router = require('express').Router()
const controllers = require('../controllers/auth')

router.post('/register', controllers.register)

module.exports = router
