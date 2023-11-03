const express = require('express')
const cors = require('cors')
const dbSetup = require('./configs/db.js')
const routes = require('./routes')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const { notFound, errorHanler } = require('./middlewares/error.js')
const app = express()
app.use(cookieParser())
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)

dbSetup()

app.use(routes)
app.use(notFound)
app.use(errorHanler)

app.listen(port, () => {
  console.log('Server running on port:' + port)
})
