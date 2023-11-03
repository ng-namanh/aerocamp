const router = require('express').Router()
const controllers = require('../../controllers/campground.js')
const { verifyAccessToken } = require('../../middlewares/jwt')
const upload = require('../../middlewares/storage.js')

router.get('/', controllers.getAllCampground)
router.get('/:id', controllers.getCampground)
router.post('/create', verifyAccessToken, controllers.createCampground)
router.post(
  '/img-upload',
  verifyAccessToken,
  upload.array('images', 20),
  controllers.uploadCampgroundImage
)
router.post('/upload-by-link', verifyAccessToken, controllers.uploadImgByLink)
module.exports = router
