const express = require('express')
const cors = require('cors')
const app = express()
const profile = require('./api/profile')
const auth = require('./api/auth')

app.use(express.json({ limit: '20mb' }))
app.use(cors())
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

app.use('/api/profile', profile)
app.use('/api/auth', auth)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`))
