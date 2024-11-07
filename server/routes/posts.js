//routes/posts.js

const express = require('express');
const router = express.Router();
const { masterConnection, getNextSlaveConnection, slaveConnections } = require('../config/db');
const { createPostModel } = require('../models/Post');

// Create a new post (Write operation - Master only)
router.post('/', async (req, res) => {
    try {
        const MasterPost = createPostModel(masterConnection);
        const post = new MasterPost(req.body);
        await post.save();

        // Simulate replication to slaves
        await simulateReplication(post);

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all posts (Read operation - Distributed across slaves)
router.get('/', async (req, res) => {
    try {
        const slaveConnection = getNextSlaveConnection();
        const SlavePost = createPostModel(slaveConnection);
        const posts = await SlavePost.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Simulate replication to slave databases
async function simulateReplication(post) {
    try {
        for (const slaveConnection of slaveConnections) {
            const SlavePost = createPostModel(slaveConnection);
            await new SlavePost(post.toObject()).save();
        }
    } catch (error) {
        console.error('Replication error:', error);
    }
}

module.exports = router;
