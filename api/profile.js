const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:id', async (req, res) => {
  fs.readFile('.,/data.json', 'utf8', async (err, jsonString) => {
    if (err) {
      console.log('Error reading file from disk:', err)
      return
    }
    try {
      const data = JSON.parse(jsonString)

      const user = data.users.find((user) => user.id === req.params.id)

      res.status(200).json(user)
    } catch (err) {
      console.log('Error parsing JSON string:', err)
    }
  })
})

module.exports = router
