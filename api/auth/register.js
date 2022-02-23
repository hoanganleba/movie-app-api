const bcrypt = require('bcrypt')
const User = require('../../models/user.model')
const dbConnect = require('../../dbConnect')
const allowCors = require('../../allowCors')

const handler = async (req, res) => {
  if (req.method === 'POST') {
    dbConnect()
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
  } else {
    res.status(405).send('Method not allowed')
  }
}

module.exports = allowCors(handler)
