const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const redisConnection = require('../redis-connection');
const { sendMessage } = require('./message');

const searchers = {};

app.use(express.static(path.join(__dirname + '/client')));

const server = app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

const io = require('socket.io')(server);
let username;

io.sockets.on('connection', socket => {
  let { id } = socket;
  console.log(`New client with id:${id}.`);

  socket.on('search', async data => {
    try {
      if (data.username === '') {
        socket.emit('failure', { data: 'Username is required!' });
      } else if (!username && searchers[data.username]) {
        socket.emit('failure', { data: `${data.username} already in use!` });
      } else if (data.query === '') {
        socket.emit('failure', { data: `Query is required!` });
      } else if (data.msg === '') {
        socket.emit('failure', { data: `Message is required!` });
      } else {
        username = data.username;
        searchers[username] = id;
        let res = await sendMessage({ eventName: 'search', data });
        if (res.hits[0]) {
          socket.emit('success', { res, username, msg: data.msg });
          socket.broadcast.emit('broadcast', { res, username, msg: data.msg });
        } else {
          socket.emit('failure', { data: 'No images found!' });
        }
      }
    } catch (err) {
      socket.emit('failure', { data: err });
      console.error(err);
    }
  });

  socket.on('disconnect', () => {
    console.log(`id: ${id} disconnected.`);
    if (username) {
      delete searchers[username];
    }
  });
});
