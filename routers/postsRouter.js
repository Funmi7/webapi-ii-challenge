const express = require('express');
const postsRouter = express.Router();
const db = require('../data/db');

postsRouter.post('/', (req, res) => {
    const postInfo = req.body;
    db.insert(postInfo)
    .then(post => {
       res.status(201).json(post) 
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

postsRouter.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(error => {
        error
    });
});

module.exports = postsRouter;