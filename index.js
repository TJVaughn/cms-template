const express = require('express')
const http = require('http')
const path = require('path')
const cors = require('cors')
const app = require('./server/src/app')
const server = http.createServer(app)
const port = process.env.PORT || 5000
const publicDirPath = path.join(__dirname, './client/')
const router = new express.Router()


router.get('/api/site-title', async (req, res) => {
    return res.send("dynamic site-title")
})

router.get('/app', async(req, res) => {
    return res.sendFile(`${publicDirPath}/public/app.html`)
})


const corsOptions = {
    origin: ['http://localhost:8080'],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(express.json())
app.use(router)
app.use(cors(corsOptions))
app.use(express.static(`${publicDirPath}/static`))

server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})