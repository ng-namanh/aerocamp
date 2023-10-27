import UserModal from '../server/src/modal/User.js'
import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = 5000

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.post('/login', async (req, res) => {
  const User = new UserModal({
    username: 'Nam Anh',
    password: 'abdcds'
  })
  const createUser = await User.save()
  res.json(createUser)
})

mongoose
  .connect(
    'mongodb+srv://aerocamp2710:wev1lYdbv5GnVX1n@aerocamp.phrusfr.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log(`Listening on port ${PORT}`)
    app.listen(PORT)
  })
