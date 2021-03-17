const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String
    },
    tags: [
        {
            type: String
        }
    ],
    content: {
        type: String,
        required: true
    },
    slug: {
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        type: String
    }
}, {
    timestamps: true
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog