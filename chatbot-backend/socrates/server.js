const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const intentHandler = require('./intentHandler');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('user_message', (msg) => {
    const reply = intentHandler(msg); 
    socket.emit('bot_message', reply);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
