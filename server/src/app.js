const express = require('express')
require('./db/mongoose')
const app = express()

app.use(express.json())
const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
app.use(userRoute)
app.use(blogRoute)
module.exports = app