const mongoose = require('mongoose')

const dbSetup = async () => {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGO_URI)
    if (dbConnect.connection.readyState === 1) {
      console.log('Database connected')
    } else {
      console.log('Database connection failed')
    }
  } catch (error) {
    console.log('DB Connection Failed')
    throw new Error(error)
  }
}

module.exports = dbSetup
