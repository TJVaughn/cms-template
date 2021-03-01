const express = require('express')
require('./db/mongoose')
const app = express()

app.use(express.json())
const userRoute = require('./routes/user')

app.use(userRoute)
module.exports = app