const express = require('express')
const http = require('http')
const path = require('path')
const app = require('./server/src/app')
const server = http.createServer(app)
const port = process.env.PORT || 5000
const publicDirPath = path.join(__dirname, './client/public')
const router = new express.Router()

router.get('/api/site-title', async (req, res) => {
    return res.send("dynamic site-title")
})

app.use(express.json())
app.use(router)
app.use(express.static(publicDirPath))
server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})