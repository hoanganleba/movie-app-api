const User = require('../../../models/user.model')
const allowCors = require('../../../allowCors')
const dbConnect = require('../../../dbConnect')

const handler = async (req, res) => {
  if (req.method === 'GET') {
    dbConnect()
    const user = await User.findById(req.query.id).exec()
    if (!user) {
      return res
        .status(401)
        .json({ message: 'User not exist, please try again!' })
    }
    return res.status(200).json({
      email: user.email,
      favorites: user.favorites,
    })
  } else {
    res.status(405).send('Method not allowed')
  }
}

module.exports = allowCors(handler)
