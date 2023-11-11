const router = require('express').Router()
const controllers = require('../../controllers/campground.js')
const { authentication } = require('../../middlewares/jwt')
const upload = require('../../middlewares/storage.js')

router.get('/', controllers.getAllCampground)
router.get('/:id', controllers.getCampground)
router.post('/new', authentication, controllers.createCampground)
router.post('/upload-by-link', authentication, controllers.uploadImgByLink)
router.post(
  '/upload',
  authentication,
  upload.array('images', 20),
  controllers.uploadCampgroundImage
)
router.post('/:id/review', authentication, controllers.addReview)

module.exports = router
