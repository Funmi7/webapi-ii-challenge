const express = require('express');
const postCommentsRouter = express.Router();
const db = require('../data/db');

// postCommentsRouter.post('/:id/comments', (req, res) => {
//     const { id } = req.params;
//     const postComment = req.body;
//     db.findCommentById(postComment, id)
//     .then(post => {
//         res.status(201).json(post)
//     })
//     .catch(error => {
//         res.status(500).json(error)
//     })
// })

postCommentsRouter.get('/:id/comments', (req, res) => {
    db.findCommentById()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = postCommentsRouter;