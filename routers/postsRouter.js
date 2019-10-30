const express = require('express');
const postsRouter = express.Router();
const db = require('../data/db');

postsRouter.post('/', (req, res) => {
  const postInfo = req.body;
  if (!postInfo.title || !postInfo.contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    })
  } else {
    db.insert(postInfo)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      })
  }
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


postsRouter.post('/:id/comments', (req, res) => {
  // const { id } = req.params;
  // const { text } = req.body;
  db.findById(req.params.id)
    .then(data => {
      if(data.length === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      } else if (!req.body.text) {
        res.status(400).json({
          errorMessage: "Please provide text for the comment."
        })
      } else {
        return db.insertComment(req.body)
      }   
    })
    .then(comment => {
      res.status(201).json(comment)
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      })
    })
})

postsRouter.get(':id/comments', (req, res) => {
  const { id } = req.params;
  db.findPostComments(id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

module.exports = postsRouter;