const multer = require('multer')
const uuid = require('uuid').v4

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads')
  },
  filename: (req, file, callback) => {
    const { originalname } = file
    callback(null, `${uuid()}-${originalname}`)
  }
})

const fileFilter = (req, file, callback) => {
  if (file.mimetype.split('/')[0] === 'image') {
    callback(null, true)
  } else {
    callback(new Error('file is not of the correct type'), false)
  }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 100000000 } })

module.exports = upload
