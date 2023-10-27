import UserModal from '../server/src/modal/User.js'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import passortLocal from 'passport-local'
import session from 'express-session'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const { PORT, KEY_SESSION, MONGO_URI } = process.env
const LocalStrategy = passortLocal.Strategy

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

app.use(passport.initialize())
app.use(passport.session())

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }),
  (req, res) => {
    try {
      res.json()
    } catch (error) {}
  }
)
const User = new UserModal({
  username: 'Nam Anh',
  password: '1234'
})
passport.use(
  new LocalStrategy((username, password, done) => {
    console.log(`username:${username}, password:${password}`)
    if (username === User.username && password === User.password) {
      return done(null, {
        username,
        password,
        active: true
      })
    }
  })
)

passport.serializeUser((User, done) => done(null, User.username))
passport.deserializeUser((username, done) => {
  // check username
  if (username === User.username) {
    return done(null, {
      username,
      active: true
    })
  }
})

app.get('/', (req, res) => {
  res.json('<h1>Hello World!</h1>')
})

app.post('/register', async (req, res) => {
  const createUser = await User.save()
  res.json(createUser)
})

mongoose.connect(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
})
