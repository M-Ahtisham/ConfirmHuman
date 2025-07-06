# ConfirmHuman - University Rooms Booking Chatbot

## Project Overview

**ConfirmHuman** is a Student and Professor friendly chatbot designed to assist students and staff at TH Deggendorf with university room bookings and availabilities inquiries. The chatbot provides real-time information about room reservations, availability of the rooms.

### ChatBots Developed

#### 1. Socrates
- This is the solution to the Task 1. It works by detecting the users intent by keyword spotting, and then gives responces based on some hardcoded rules. his ChatBot is found in the `main` branch


#### 2. Plato
- This is the solution to Task 3. It uses Gemini API (Gemini 2.5 Flash-Lite Preview 06-17) which has a limit of 15 queries per minute (for free version). It can understand users intent far better and can also understand text from other language appart from English. This ChatBot is found in the `task-3-chatbot-engine` branch


### Key Features
- **Room Booking**: Users can book rooms in the ITC building
- **Information about the rooms**: User can see which rooms they can book in ITC
- **Interactive Q&A**: Supports ca. 20+ questions and answers conversation turns
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices

### Use Cases
- Students looking for available study rooms
- Staff checking meeting room availability
- Event organizers seeking suitable venues (as we have differrent clubs at the Uni which organises some events )
- General room booking inquiries and assistance (Such as ITC2+)

## Technology Stack

- **Frontend**: React.js with responsive design
- **Backend**: Node.js with Express.js
- **Real-time Communication**: Socket.IO and WebSocket protocol
- **Intent Recognition**: Keyword-spotting and states to make descision (inspired by finite state automata from first semester)
- **Styling**: Tailwind CSS and Bootstrap 5
- **Deployment**: Microsoft Azure Cloud Platform

## Team Members

| Name | Student ID | Email | Primary Responsibilities |
|------|------------|-------|------------------------|
| **Muhammad Ahtisham Bhatti** | 22301502 | muhammad.bhatti2@stud.th-deg.de | Keyword Spotting Algorithm, WebSocket Implementation |
| **Erbakan Ahmad** | 12306435 | erbakan.ahmad@stud.th-deg.de | React Components Development, Conversation Engine |
| **Jamal Dassrath** | 22301035 | jamal.dassrath@stud.th-deg.de | UI/UX Design, Extensibility Features, Layout Implementation |
| **Love** | 12306406 | love.-@stud.th-deg.de | Azure Deployment, Fallback Mechanisms, System Integration |

## Project Requirements Fulfilled

### Functional Requirements
-  University room booking domain-specific conversations
-  Aggressive conversation steering through targeted questions
-  Intent understanding from user utterances
-  Soft fallback for misunderstood inputs
-  Hard fallback for repeated conversation failures (after 3 softfallbacks)
-  Room availability and scheduling task completion
-  Conversation history memory
-  20+ Q&A turn capacity
-  Non-repetitive responses (except fallbacks)
-  Modern, responsive user interface
-  Alternating question-answer display format

### Technical Requirements
-  HTML5 frontend implementation
-  CSS-based responsive layout(Bootsnip)
-  React framework with 4+ components
-  Socket.IO and WebSocket communication
-  Node.js backend (version 22.14.0 LTS)
-  Express.js server implementation
-  Keyword-spotting intent Handling
-  Extensible architecture for new intents/topics(Such as different types of rooms, we can always add more states and more keywords)
-  Bootstrap 5 integration for modern UI


### Deployment Requirements
-  Microsoft Azure cloud deployment
-  Public URL accessibility
-  SSL/TLS encryption(automatic via Azure using CLI as discussed in the Lecture)
-  Azure for Students subscription utilization 

## Quick Start Guide

For detailed setup instructions, please refer to [SETUP.md](SETUP.md) file in this repository.

### Basic Commands
```bash
# Clone the repository
git clone https://mygit.th-deg.de/aw-student-projects/ain-internet-technologies/ss25/ConfirmHuman.git

# Change directory to frontend...
cd chatbot-frontend

# Intall the frontend requirements...
npm install
npm run build

# Now copy the build to backend public folder...
rm -rf ../chatbot-backend/plato/public/*
cp -r build/* ../chatbot-backend/plato/public/

# Install the backend dependencies...
cd ../chatbot-backend/plato
npm install

# Start backend server...
node server.js &

# Socrates should now be live and running at: http://localhost:3000/
```

## Chatbot Capabilities

### Room Information Queries
- "Is room C1(Single Room) available now?"
- "When will room G10(Group Room) be free?"
- "Are there any lectures in room C301 today?"
- "Show me available meeting rooms for 2 PM/ 14 uhr or (in the morning and evening times)"

### Booking Assistance
- Check reservation conflicts
- Suggest alternative rooms
- Provide scheduling information
- Assist with booking procedures

### Schedule Management
- Show upcoming reservations
- Identify free time slots
- Alert about booking conflicts (or a softfallback of Kindly choose another slot as it has already been booked )

## File Structure

```
ConfirmHuman/ (This is the folder we have in our systems could differ on different os)
|-- chatbot-backend/
│   |-- plato/
│   |-- socrates/
|-- chatbot-engine/
│   |-- keyword-spotter.json
│   |-- README.md
|-- chatbot-frontend/
│   |-- src/
│   |-- public/
│   |-- package.json
|-- Contributions.xlsx
|-- README.md
|-- SETUP.md
|-- url.txt
```

## Development Guidelines

- **Clean Code**: Follows best practices taught in the lecture for maintainable and Clean code
- **Responsive Design**: Ensure compatibility across all devices and Operating Systems 
- **Error Handling**: Implemented Responsive fallback mechanisms for around every time the bot fails to give a correct response.
- **Extensibility**: Design for easy addition of new room types and features
- **Performance**: Optimize for real-time communication (After doing the Bonus Pronlem)

## Live Deployed ChatBot

The deployed chatbot on Azure will be accessible [Here]](https://plato-confirm-human.azurewebsites.net/)

## Course Information

- **Course**: Internet Technologies Summer Semester 2025
- **Professor**: Prof. Dr. Andreas Wölfl
- **Institution Name**: Technische Hochschule Deggendorf
- **Project Type**: Praktikumsleistung (PrL)

## License

This project is developed as part of academic coursework at Technische Hochschule Deggendorf.

---

*For technical support or questions regarding this project, please contact any team member out of four listed above.*


