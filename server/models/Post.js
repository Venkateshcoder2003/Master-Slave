// //models/Post.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Factory function to create Post model for any given connection
const createPostModel = (connection) => connection.model('Post', postSchema);

module.exports = { createPostModel };
