const express = require('express')
const router = express.Router()
const Result = require('../models/result')

// POST - save a new result
router.post('/', async (req, res) => {
  try {
    const { wpm, accuracy } = req.body
    const result = new Result({ wpm, accuracy })
    await result.save()
    res.json({ message: 'Result saved!', result })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET - get all results
router.get('/', async (req, res) => {
  try {
    const results = await Result.find().sort({ date: -1 })
    res.json(results)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router