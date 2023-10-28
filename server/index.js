import UserModel from './src/model/User.js'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import passortLocal from 'passport-local'
import session from 'express-session'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const app = express()
const { PORT, KEY_SESSION, MONGO_URI } = process.env
const LocalStrategy = passortLocal.Strategy

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(express.json())

const store = session.MemoryStore()

app.use(
  session({
    saveUninitialized: false,
    secret: KEY_SESSION,
    cookie: {
      maxAge: 1000 * 10 // 10s
    },
    store
  })
)

app.use(passport.initialize()) // initialize passport
app.use(passport.session())

passport.use(new LocalStrategy(UserModel.authenticate())) // authenticate user

passport.serializeUser(UserModel.serializeUser()) // how to store a user in session
passport.deserializeUser(UserModel.deserializeUser()) // get user out of that session

/* app.post('/login', passport.authenticate('local'), async (req, res) => {
  res.json('ok')
  console.log('Login OK')
}) */
app.post('/login', passport.authenticate('local'), async (req, res) => {
  const { username } = req.body
  const userDoc = await UserModel.findOne({ username })
  if (userDoc) {
    res.json(userDoc)
    console.log(userDoc)
  } else {
    res.status(404).json('not found')
  }
})

app.post('/register', async (req, res) => {
  const { username, password } = req.body // get the request data from client
  try {
    // create new model
    const userDoc = new UserModel({
      username,
      password
    })
    const registeredUser = await UserModel.register(userDoc, password) // register user through passport-local-moongoose plugin
    res.json(registeredUser) // send back json response to client
  } catch (error) {
    res.status(422).json({ error: error.message }) // catch error
  }
})

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user
    res.json(user)
  } else {
    res.status(401).json('Unauthorized')
  }
})

mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
})
