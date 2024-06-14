const express = require('express')

const app = express()

app.use(express.json())

// Import routes
const userRouter = require('./routes/user.route')

// routes declaration
app.use('/api/v1/user', userRouter)



module.exports = app