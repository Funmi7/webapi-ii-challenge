const express = require('express');
const postsRouter = require('./routers/postsRouter');
const postCommentsRouter = require('./routers/postCommentsRouter');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);
server.use('/api/posts', postCommentsRouter);

server.get('/', (req, res) => {
    res.send(`
      Server up and running!
    `);
  });
  

  server.listen(process.env.PORT || 6000, () => {
	console.log('listening on ' + (process.env.PORT || 6000));
})