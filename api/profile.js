const express = require('express')
const router = express.Router()
const User = require('../models/user.model')

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).exec()
  if (!user) {
    return res
      .status(401)
      .json({ message: 'User not exist, please try again!' })
  }
  return res.status(200).json({
    email: user.email,
    favorites: user.favorites,
  })
})

router.post('/:id/add-show-to-favorites', async (req, res) => {
  await User.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $push: { favorites: req.body.showId },
    }
  )
  return res.status(200).json({
    message: 'Added to favorites',
  })
})

router.post('/:id/remove-show-from-favorites', async (req, res) => {
  await User.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $pull: { favorites: req.body.showId },
    },
    { new: true }
  )
  return res.status(200).json({
    message: 'Remove from favorites',
  })
})

module.exports = router
