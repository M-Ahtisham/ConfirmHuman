# ConfirmHuman Setup Guide

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
chatbot-project/
├── chatbot-backend/
│   └── socrates/
│       └── intentHandler.js
├── chatbot-engine/
│   ├── keyword-spotter.json
│   └── README.md
├── chatbot-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── other frontend files
├── Contributions.xlsx
├── README.md
├── SETUP.md
└── url.txt
```

## Installation Steps

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
1. Navigate to the backend folder:
   ```bash
   cd chatbot-backend
   ```
2. Install the required packages:
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

## Running the Application

### Option 1: Run Both Services Manually or Using the script

1. Run this command (make sure to be in the correct directory) :
    ```bash 
    chmod +x script.sh
     ```
    
2. Then run the Setup script :
      ```bash 
    ./script.sh
     ``` 
3. You will see, If something is already running on port 3000
   Press **Y** when prompted to run or **N** not to run the script
     

#### Start the Backend Server
1. Open a terminal window
2. Navigate to the backend folder:
   ```bash
   cd chatbot-backend
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. You should see a message like: "Server running on port 3001"
5. **Keep this terminal window open**

#### Start the Frontend Application
1. Open a **new** terminal window
2. Navigate to the frontend folder:
   ```bash
   cd chatbot-frontend
   ```
3. Start the React application:
   ```bash
   npm start
   ```
4. You should see a message like: "Local: http://localhost:3000"
5. Your web browser should automatically open the chatbot

### Option 2: Run with Development Scripts (we will add this later)
Some projects include scripts to run both services at once:
```bash
npm run dev
```
(Schau into the package.json for the available scripts)

## Accessing the Chatbot

1. **Local Access**: Open your web browser and go to `http://localhost:3000`
2. **Network Access**: Other devices on your network can access it using your computer's IP address (e.g., `http://192.168.1.100:3000`)

## How to Use the Chatbot

1. The chatbot interface will load in your browser
2. You'll see a chat window with an input field at the bottom
3. Type your message and press Enter or click Send
4. The chatbot will respond based on its programmed topic and intents
5. The conversation supports 20+ question-answer turns
6. The interface is responsive and works on mobile, tablet, and desktop

## Troubleshooting

### Common Issues and Solutions

**Port Already in Use**
- Error: "Port 3000 is already in use"
- Solution: Either close the other application using that port, or change the port in the configuration

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
2. Check the backend terminal for server errors
3. Verify all dependencies are installed correctly
4. Make sure both frontend and backend are running
5. Confirm your Node.js version is compatible as mentioned ata the Top.

---

**Note**: This is a development setup. For production deployment, refer to the Azure deployment instructions in the project requirements for ConfirmHuman.