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

// Store conversation states per user
const userStates = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Initialize state for this user
  userStates.set(socket.id, {
    currentState: 'start',
    context: {} // Can store additional conversation context here
  });

  socket.on('user_message', (msg) => {
    const userState = userStates.get(socket.id);
    
    // Get current state and pass to intent handler
    const { response, newState } = intentHandler(msg, userState.currentState);
    
    // Update user's state
    userState.currentState = newState;
    userStates.set(socket.id, userState);
    
    // Send response to client
    socket.emit('bot_message', response);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Clean up user state
    userStates.delete(socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});