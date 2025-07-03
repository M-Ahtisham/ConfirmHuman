# ConfirmHuman - University Rooms Booking Chatbot

## BACKEND FOLDER INFORMATION

This directory contains 2 sub directories. 

### Socrates
- This is the solution to the Task 1. It is a ChatBot that detects keywords from the users message and then gives responces depending in the message. The main logic of the ChatBot is handled by the `intentHandler.js` file.


### Plato
- This is the solution to the Task 3. It is a ChatBot that works by using the Gemini API from Google. The API Key is stored in the `.env.local` file, this will not be uploaded to the project as mentioned in the requirements. 


## How to run the code offline

in MacOS / Linux

``` bash

cd chatbot-backend
cd socrates # Or plato, depending on what you want to test
node server.js
```

then open `localhost:3000` in your browser.