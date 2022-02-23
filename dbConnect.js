const mongoose = require('mongoose')

const dbConnect = () => {
  mongoose.connect(
    'mongodb+srv://hoanganleba:megolio1998@cluster0.npceu.mongodb.net/movie?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
}

module.exports = dbConnect
