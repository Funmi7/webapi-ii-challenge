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
  

  server.listen(process.env.PORT || 6000, () => {
	console.log('listening on ' + (process.env.PORT || 6000));
})