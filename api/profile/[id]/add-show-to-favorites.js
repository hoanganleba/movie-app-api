const User = require('../../../models/user.model')
const allowCors = require('../../../allowCors')
const dbConnect = require('../../../dbConnect')

const handler = async (req, res) => {
  if (req.method === 'POST') {
    dbConnect()
    await User.findOneAndUpdate(
      {
        _id: req.query.id,
      },
      {
        $push: { favorites: req.body.showId },
      }
    )
    return res.status(200).json({
      message: 'Added to favorites',
    })
  } else {
    res.status(405).send('Method not allowed')
  }
}

module.exports = allowCors(handler)
