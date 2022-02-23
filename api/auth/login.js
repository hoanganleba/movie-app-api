const bcrypt = require('bcrypt')
const User = require('../../models/user.model')
const dbConnect = require('../../dbConnect')
const allowCors = require('../../allowCors')

const handler = async (req, res) => {
  if (req.method === 'POST') {
    dbConnect()
    const user = await User.findOne({ email: req.body.email })
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res
        .status(400)
        .send({ message: 'Invalid email or password, please try again' })
    }
    res.status(200).json({
      message: 'Login successfully',
      userId: user._id,
    })
  } else {
    res.status(405).send('Method not allowed')
  }
}

module.exports = allowCors(handler)
