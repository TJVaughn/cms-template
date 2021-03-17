const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Blog = require('../models/Blog')
const path = require('path')
const publicDirPath = path.join(__dirname, '../../../client/')

//Create Blog
router.post('/api/blog', auth, async (req, res) => {
    try {
        const b = req.body
        let slug = b.title.split(' ').join('-').toLowerCase()
        slug = encodeURI(slug)
        const blog = new Blog({
            title: b.title,
            slug,
            metaData: {
                snippet: b.snippet,
            },
            tags: [
                ...b.tags
            ],
            content: b.content
        })
        await blog.save()
        res.send({blog})
    }catch(error) {
        return res.send({error: "There was a problem: " + error})
    }
})

//Read blog by query
router.get('/blog/:id', async(req, res) => {
    try{
        const blog = await Blog.findOne({slug: req.params.id})
        // res.send(blog)
        res.render(`${publicDirPath}static/blog`, {
            blog
        })
    }catch(error){
        return res.send({ error: "There was a problem: " + error })
    }
})
//read all blogs
router.get('/blog', async(req, res) => {
    try {
        const blogs = await Blog.find()
        return res.render(`${publicDirPath}static/allBlogs`, {
            blogs
        })
    } catch (error) {
        return res.send({ error: "There was a problem: " + error })
    }
})
module.exports = router