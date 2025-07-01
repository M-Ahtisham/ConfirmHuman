const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const intentHandler = require('./intentHandler'); // This is the file that will handle the main logic of the chatbot

app.use(express.static(path.join(__dirname, 'public')));

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',   // Removed ' * ' as suggested by Professor in the Lecture
    methods: ['GET', 'POST'],
  }
});

// The above code snippet is taken and modified from https://stackoverflow.com/questions/67848950/setting-up-socket-io-in-an-express-server-error-typeerror-require-listen

// Store conversation states per user
const userStates = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Initialize state and other variables for this user
  userStates.set(socket.id, {
    currentState: 'start', // This is the innitial state
    context: [0, null, null, null, null] // We will store the fallbacks, name, date, time and room here separated by commas
    });

  socket.on('user_message', (msg) => {
    const userState = userStates.get(socket.id);
    
    // Get current state and pass to intent handler
    const { response, newState , context} = intentHandler(msg, userState.currentState, userState.context);
    
    // Update user's state
    userState.currentState = newState;
    userState.context = context; // we update the context, it is a list like this [name, date, time, room]
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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// This is based on the code examples from here https://socket.io/get-started/chat and https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs