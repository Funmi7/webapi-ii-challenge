const express = require('express');
const postsRouter = require('./routers/postsRouter');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);


server.get('/', (req, res) => {
    res.send(`
      Server up and running!
    `);
  });

module.exports = server;