const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Blog = require('../models/Blog')
const path = require('path')
const publicDirPath = path.join(__dirname, '../../../client/')

const errorMsg = (error) => {
    return {error: "There was a problem: " + error}
}

//Create Blog
router.post('/api/blog', auth, async (req, res) => {
    try {
        const b = req.body
        let slug = b.title.split(' ').join('-').toLowerCase()
        slug = encodeURI(slug)
        const blog = new Blog({
            title: b.title,
            slug,
            snippet: b.snippet,
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

//Render or send json data blog by params or query
//if you end the call with ?api=true you will just get the json data
router.get('/blog/:slug', async(req, res) => {
    try{
        const blog = await Blog.findOne({slug: req.params.slug})
        // res.send(blog)
        if(req.query.api){
            return res.send(blog)
        }
        res.render(`${publicDirPath}static/blog`, {
            blog
        })
    }catch(error){
        return res.send({ error: "There was a problem: " + error })
    }
})
//render all blogs
router.get('/blog', async(req, res) => {
    try {
        const blogs = await Blog.find()
        if(req.query.api){
            return res.send(blogs)
        }
        return res.render(`${publicDirPath}static/allBlogs`, {
            blogs
        })
    } catch (error) {
        return res.send({ error: "There was a problem: " + error })
    }
})

//Update Blog
router.patch('/api/blog/:id', auth, async(req, res) => {
    try {
        const allowedUpdates = ['title', 'snippet', 'tags', 'content']
        const updates = Object.keys(req.body)
        let isValidUpdate = updates.every((update) => {
            return allowedUpdates.includes(update)
        })
        if(!isValidUpdate){
            return res.send(errorMsg("Invalid Update"))
        }
        const blog = await Blog.findOne({_id: req.params.id})
        if(!blog) {
            return res.send(errorMsg("Blog not found"))
        }
        updates.forEach((update) => {
            blog[update] = req.body[update]
        })
        await blog.save()
        return res.send(blog)
    } catch (error) {
        return res.send(errorMsg(error))
    }
})

//Delete Blog
router.delete('/api/blog/:id', auth, async(req, res) => {
    try {
        const blog = await Blog.findOne({_id: req.params.id})
        if(!blog){
            return res.send(errorMsg("Blog not found!"))
        }
        await blog.delete()
        return res.send({message: {
            message: "Blog deleted",
            blog
        }})
    } catch (error) {
        return errorMsg(error)
    }
})
module.exports = router