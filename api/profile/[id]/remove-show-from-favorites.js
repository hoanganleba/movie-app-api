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
        $pull: { favorites: req.body.showId },
      },
      { new: true }
    )
    return res.status(200).json({
      message: 'Remove from favorites',
    })
  } else {
    res.status(405).send('Method not allowed')
  }
}

module.exports = allowCors(handler)
