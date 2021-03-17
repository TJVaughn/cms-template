const express = require('express')
const http = require('http')
const path = require('path')
const cors = require('cors')
const app = require('./server/src/app')
const server = http.createServer(app)
const port = process.env.PORT || 5000
const publicDirPath = path.join(__dirname, './client/')
const router = new express.Router()


// const corsOptions = {
//     origin: ['http://localhost:8080'],
//     credentials: true,
//     optionsSuccessStatus: 200
// }

app.use(router)
// app.use(cors(corsOptions))
app.use(express.json())

router.get('/api/test', async (req, res) => {
    // res.header("Access-Control-Allow-Origin", "origin")
    return res.send("This is basic test content")
})

router.get('/app', async(req, res) => {
    return res.sendFile(`${publicDirPath}/public/app.html`)
})


app.use(express.static(`${publicDirPath}/static`))

app.set('view engine', 'ejs')

app.get('/', async(req, res) => {
    res.render(`${publicDirPath}/static/index`)
})

server.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})