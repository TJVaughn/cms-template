const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Blog = require('../models/Blog')

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

router.get('/api/blog/', async(req, res) => {
    try{
        const blog = await Blog.find({slug: req.query.s})
        res.send(blog)
    }catch(error){
        return res.send({ error: "There was a problem: " + error })
    }
})

module.exports = router