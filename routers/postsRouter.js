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
      res.status(500).json({
        error: "The posts information could not be retrieved."
      })
    });
});


postsRouter.post('/:id/comments', (req, res) => {
  db.findById(req.params.id)
    .then(data => {
      if (data.length === 0) {
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

postsRouter.get('/:id', (req, res) => {
  db.findById(req.params.id)
  .then(data => {
    if(data.length === 0) {
      res.status(404).json({
        message: "The post with the specified ID does not exist." 
      })
    } else {
      res.status(200).json(data)
    }
  })
  .catch(error => {
    res.status(500).json({
      error: "The post information could not be retrieved."
    });
  });
});

postsRouter.get('/:id/comments', (req, res) => {
  db.findById(req.params.id)
    .then(data => {
      if (data.length === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      } else {
        return db.findPostComments(req.params.id)
      }
    })
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(error => {
      res.status(500).json({
        error: "The comments information could not be retrieved."
      })
    })
})

postsRouter.delete('/:id', (req, res) => {
  db.remove(req.params.id)
  .then(deleted => {
    if(deleted === 0) {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      })
    } else {
      res.status(204).json(deleted)
    }
  })
  .catch(error => {
    res.status(500).json({
      error: "The post information could not be modified."
    })
  })
})

postsRouter.put('/:id', (req, res) => {
  const updateInfo = req.body;
  if(!updateInfo.title || !updateInfo.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  } else {
    db.update(req.params.id, updateInfo)
    .then(updated => {
      if(updated === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      } else {
        res.status(200).json(updated)
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The post information could not be modified."
      })
    })
  }
})

module.exports = postsRouter;