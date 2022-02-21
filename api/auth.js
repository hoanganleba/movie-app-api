const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

router.post('/register', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    return res
      .status(400)
      .send({ message: 'Email already exists! Please choose another' })
  }

  const newUser = new User({
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  })

  newUser.save()
  return res.status(201).json({
    message: 'Register successfully',
  })
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res
      .status(400)
      .send({ message: 'Your username and/or password do not match' })
  }
  res.status(200).json({
    message: 'Login successfully',
    userId: user._id,
  })
})

module.exports = router
