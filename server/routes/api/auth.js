const router = require('express').Router()
const controllers = require('../../controllers/auth')

router.post('/register', controllers.register)
router.post('/login', controllers.login)

module.exports = router
