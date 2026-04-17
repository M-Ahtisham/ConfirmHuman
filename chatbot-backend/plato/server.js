const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { GoogleGenAI } = require('@google/genai');

const prompt = require('./prompt');
const dotenv = require('dotenv');

app.use(express.static(path.join(__dirname, 'public')));

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',   // Frontend runs on port 3000 , local testing only
    methods: ['GET', 'POST'],
  }
});

// The above code snippet is taken and modified from https://stackoverflow.com/questions/67848950/setting-up-socket-io-in-an-express-server-error-typeerror-require-listen

// Store conversation states per user
const userStates = new Map();

io.on('connection', (socket) => {
  console.log('User connected: - - - - - - - - - - - - - -', socket.id);

  // Initialize state and other variables for this user
  userStates.set(socket.id, {
    currentState: 'start', // This is the innitial state
    context: [] // We will store the fallbacks, name, date, time and room here separated by commas
  });

  socket.on('user_message', async (msg) => {
    const userState = userStates.get(socket.id);

    userState.context.push({type: 'user', text: msg});

    const data = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: `${prompt} \n The history of the conversation is: ${JSON.stringify(userState.context)} \n Now my query is: ${msg}`,
    });

    userState.context.push({type: 'bot', text: data.text});
    userStates.set(socket.id, userState);

    socket.emit('bot_message', data.text);
    return

    // Get current state and pass to intent handler
    // const { response, newState, context } = intentHandler(msg, userState.currentState, userState.context);

    // Update user's state
    // userState.currentState = newState;
    // userState.context = context; // we update the context, it is a list like this [name, date, time, room]
    // userStates.set(socket.id, userState);

    // Send response to client
    // socket.emit('bot_message', response);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Clean up user state
    userStates.delete(socket.id);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// This is based on the code examples from here https://socket.io/get-started/chat and https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs