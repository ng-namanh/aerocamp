const router = require('express').Router()
const controllers = require('../../controllers/campground.js')
const { verifyAccessToken } = require('../../middlewares/jwt')
const upload = require('../../middlewares/storage.js')

router.get('/', controllers.getAllCampground)
router.get('/:id', controllers.getCampground)
router.post('/new', verifyAccessToken, controllers.createCampground)
router.post('/upload-by-link', verifyAccessToken, controllers.uploadImgByLink)
router.post(
  '/img-upload',
  verifyAccessToken,
  upload.array('images', 20),
  controllers.uploadCampgroundImage
)

module.exports = router
