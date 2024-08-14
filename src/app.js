const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

// Import routes
const userRouter = require('./routes/user.route')

// routes declaration
app.use('/api/v1/user', userRouter)



module.exports = app