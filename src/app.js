const express = require('express')

const app = express()


// Import routes
const userRouter = require('./routes/user.route')

// routes declaration
app.use('/api/v1/user', userRouter)



module.exports = app