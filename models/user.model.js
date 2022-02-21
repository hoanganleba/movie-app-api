const mongoose = require('mongoose')

const UserModel = mongoose.Schema({
  email: String,
  password: String,
  favorites: Array,
})

module.exports = mongoose.model('user', UserModel)
