# ConfirmHuman Setup Guide for Plato

## Overview
This guide will help you set up and run the chatbot project locally on your Compture. The project consists of a React frontend and a Node.js backend that communicate using Socket.IO.

## Prerequisites
Before you start, make sure you have the following installed on your computer:

- **Node.js** (version 22.14.0 LTS as per Praktikumsleistung (PrL) requirenments)
  - Download from: https://nodejs.org/
  - Check if installed: Open terminal/command prompt and type `node --version`
- **Git** (for version control)
  - Download from: https://git-scm.com/
- **Web browser** (Chrome, Firefox, Safari, or Edge)
- **Text editor** (VS Code recommended(as we four has worked using that on our respective systems))

## Project Structure
```
ConfirmHuman/
.
├── build_app.sh
├── chatbot-backend
│   ├── plato
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── prompt.js
│   │   └── server.js
│   └── README.md
├── chatbot-frontend
│   ├── Frontend Notes.txt
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── src
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── assets
│   │   │   │   └── Plato.png
│   │   │   └── chat
│   │   │       ├── Background.css
│   │   │       ├── Background.jsx
│   │   │       ├── ChatCard.jsx
│   │   │       ├── ChatContainer.jsx
│   │   │       ├── MessageBubble.jsx
│   │   │       ├── MessageList.jsx
│   │   │       └── TypewriterText.jsx
│   │   ├── font
│   │   │   └── Spartacus.ttf
│   │   ├── index.css
│   │   ├── index.js
│   │   └── logo.svg
│   └── tailwind.config.js
├── Contributions.xlsx
├── README.md
├── SETUP.md
└── url.text
```

## Installation and Running Steps

### Step 1: Clone or Download the Project
1. If using Git, clone the repository:
   ```bash
   git clone https://mygit.th-deg.de/aw-student-projects/ain-internet-technologies/ss25/ConfirmHuman.git
   ```
2. Or download the project as a ZIP file from GitLab and extract it
3. Open terminal/command prompt and navigate to the project folder:
   ```bash
   cd ConfirmHuman
   ```

### Step 2: Install Backend Dependencies

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey) to get a Gemini API Key.

2. Create a file named `.env` in the `chatbot-backend/plato` directory and add your API key as follows:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Navigate to the backend folder:
   ```bash
   cd chatbot-backend/plato
   ```
4. Install the required packages:
   ```bash
   npm install
   npm init -y
   npm install express socket.io cors
   ```
   This will install:
   - Express.js (web server)
   - Socket.IO (real-time communication)
   - Other dependencies listed in package.json



### Step 3: Install Frontend Dependencies
1. Navigate to the frontend folder:
   ```bash
   cd ../chatbot-frontend
   ```
2. Install the required packages:
   ```bash
   npm install
   npm install socket.io-client
   ```
   This will install:
   - React framework
   - Socket.IO client
   - Tailwind CSS (for styling)
   - Other dependencies listed in package.json

### Step 4: Build the frontend and move the build into the backend

1. From the `chatbot-frontend` directory, build the React app:
```bash
npm run build
```

2. Copy the built frontend files to the backend's public folder. This will overwrite any existing files in that directory:

```bash
rm -rf ../chatbot-backend/plato/public/*
cp -r build/* ../chatbot-backend/plato/public/
```

### Step 5: Start the Application

1. Navigate back to the backend directory:

```bash
cd ../chatbot-backend/plato
```

2. Start the backend server:
```bash
node server.js &
```
3. The & will run the server in the background, allowing you to continue using the terminal. Access the application in your web browser at http://localhost:3000/ or http://localhost:3001/.





## Accessing the Chatbot

1. **Local Access**: Open your web browser and go to `http://localhost:3000`
2. **Network Access**: Other devices on your network can access it using your computer's IP address (e.g., `http://192.168.1.100:3000`)

## How to Use the Chatbot

1. The chatbot interface will load in your browser (Please don't use Safari, somethings wont render)
2. You'll see a chat window with an input field at the bottom
3. Type your message and press Enter or click Send
4. The chatbot will respond based on its programmed topic and intents
5. The conversation supports 20+ question-answer turns
6. The interface is responsive and works on mobile, tablet, and desktop

## Troubleshooting

### Common Issues and Solutions

**Port Already in Use**
- Error: "Port 3000 is already in use"
- Solution: Either close the other application using that port, or restart yout device

**Dependencies Not Installing**
- Error: npm install fails
- Solution: 
  1. Delete `node_modules` folder and `package-lock.json`
  2. Run `npm install` again
  3. Make sure you have the correct Node.js version

**Backend Not Connecting**
- Check that both frontend and backend are running
- Verify the Socket.IO connection settings match between frontend and backend
- Check browser console for error messages

**Chatbot Not Responding**
- Check the keyword-spotter.json configuration
- Verify that intentHandler.js is working correctly
- Look at the backend terminal for error messages

## Configuration Files

### keyword-spotter.json
- Contains the chatbot's intent recognition patterns
- Located in `chatbot-engine/keyword-spotter.json`
- Modify this file to add new intents and responses

### Frontend Configuration
- Main configuration in `chatbot-frontend/package.json`
- Styling with Tailwind CSS in `tailwind.config.js`
- PostCSS configuration in `postcss.config.js`

## Development Notes

### Adding New Features
1. **New Intents**: Add patterns to `keyword-spotter.json`
2. **New Responses**: Update `intentHandler.js`
3. **UI Changes**: Modify React components in `src/` folder
4. **Styling**: Use Tailwind CSS classes or add custom CSS

### Code Quality
- Write clean, readable code
- Use meaningful variable and function names
- Add comments for complex logic
- Follow React best practices

## Stopping the Application

1. In each terminal window, press `Ctrl + C` (Windows/Linux) or `Cmd + C` (Mac)
2. This will stop both the frontend and backend servers

## File Locations for Reference

- **Backend Code**: `chatbot-backend/`
- **Frontend Code**: `chatbot-frontend/src/`
- **Intent Configuration**: `chatbot-engine/keyword-spotter.json`
- **Project Documentation**: `README.md`
- **Team Contributions**: `Contributions.xlsx`
- **Deployment URL**: `url.txt` (for Azure deployment)

## Need Help?

1. Check the browser console (F12) for frontend errors
5. Confirm your Node.js version is compatible as mentioned at the top.
3. Verify all dependencies are installed correctly
4. Make sure both frontend and backend are running
5. Confirm your Node.js version is compatible as mentioned ata the Top.

---

**Note**: This is a development setup. For production deployment, refer to the Azure deployment instructions in the project requirements for ConfirmHuman.