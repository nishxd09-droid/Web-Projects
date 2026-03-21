const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
  wpm: Number,
  accuracy: Number,
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Result', resultSchema)