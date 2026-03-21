const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

// Routes - pehle yahan
const resultsRoute = require('./routes/results')
app.use('/api/results', resultsRoute)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000
})
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('DB Error:', err.message))

app.get('/', (req, res) => {
  res.json({ message: 'MonkeyType API is running!' })
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})