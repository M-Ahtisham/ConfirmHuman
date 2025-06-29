# ConfirmHuman - University Rooms Booking Chatbot

## Project Overview

**ConfirmHuman** is an intelligent chatbot designed to assist students and staff at TH Deggendorf with university room booking and availability inquiries. The chatbot provides real-time information about room reservations, availability of the rooms.

### Key Features
- **Room Availability Checking**: Instantly check if specific rooms are available
- **Schedule Information**: View when rooms will be free or occupied
- **Real-time Updates**: Get current status of room bookings and usage
- **Interactive Q&A**: Supports ca. 20+ questions and answers conversation turns
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices(Jamal you have to verify this)

### Use Cases
- Students looking for available study rooms
- Staff checking meeting room availability
- Event organizers seeking suitable venues(as we have differrent clubs at the Uni which organises some events )
- General room booking inquiries and assistance (Such as ITC2+)

## Technology Stack

- **Frontend**: React.js with responsive design
- **Backend**: Node.js with Express.js
- **Real-time Communication**: Socket.IO and WebSocket protocol
- **Intent Recognition**: Keyword-spotting algorithm
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
-  Conversation engine through targeted questions
-  Intent understanding from user utterances
-  Soft fallback for misunderstood inputs
-  Hard fallback for repeated conversation failures
-  Room availability and scheduling task completion
-  Conversation history memory and reset chat fucntions
-  20+ Q&A turn capacity
-  Non-repetitive responses (except fallbacks)
-  Modern, responsive user interface
-  Alternating question-answer display format

### Technical Requirements
-  HTML5 frontend implementation
-  CSS-based responsive layout(bootsnip)
-  React framework
-  Socket.IO and WebSocket communication
-  Node.js backend (version 22.14.0 LTS)
-  Express.js server implementation
-  Keyword-spotting intent handeling
-  Extensible architecture for new intents/topics
-  Bootstrap 5 integration for modern UI
-  Clean, maintainable code structure

### Deployment Requirements
-  Microsoft Azure cloud deployment
-  Public URL accessibility
-  SSL/TLS encryption
-  Azure for Students subscription utilization

## Quick Start Guide

For detailed setup instructions, please refer to [SETUP.md](SETUP.md) file in this repository.

### Basic Commands
```bash
# Clone the repository
git clone https://mygit.th-deg.de/aw-student-projects/ain-internet-technologies/ss25/ConfirmHuman.git

# Install dependencies
cd ConfirmHuman/chatbot-backend && npm install(well this depends upon in which folder it has been saved on diffrent os)
cd ../chatbot-frontend && npm install

# Run the application
# Terminal 1: Backend
cd chatbot-backend && npm start

# Terminal 2: Frontend  
cd chatbot-frontend && npm start
```

## Chatbot Capabilities

### Room Information Queries
- "Is room ITC 2+ room C9 available now?"
- "When will room G207 be free?"
- "Are there any lectures in room C301 today?"
- "Show me available meeting rooms for 2 PM/ 14 uhr or (in the morning and evening times)"

### Booking Assistance
- Check reservation conflicts
- Suggest alternative rooms
- Provide scheduling information
- Assist with booking procedures

### Schedule Management
- Display daily room schedules
- Show upcoming reservations
- Identify free time slots
- Alert about booking conflicts (or a softfallback of Kindly choose another slot as it has already been booked )

## File Structure

```
ConfirmHuman/ (This is the folder we have in our systems could differ on different os)
├── chatbot-backend/
│   └── socrates/
│       └── intentHandler.js
├── chatbot-engine/
│   ├── keyword-spotter.json
│   └── README.md
├── chatbot-frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── Contributions.xlsx
├── README.md
├── SETUP.md
└── url.txt
```

## Development Guidelines

- **Clean Code**: Follow best practices for maintainable code
- **Responsive Design**: Ensure compatibility across all devices
- **Error Handling**: Implement robust fallback mechanisms
- **Extensibility**: Design for easy addition of new room types and features
- **Performance**: Optimize for real-time communication (After doing the Bonus Pronlem)

## Live Demo

The deployed chatbot on Azure will be accessible at: [URL provided in url.txt] 

## Course Information

- **Course**: Internet Technologies
- **Professor**: Prof. Dr. Andreas Wölfl
- **Institution**: Technische Hochschule Deggendorf
- **Semester**: Summer Semester 2025
- **Project Type**: Praktikumsleistung (PrL)

## License

This project is developed as part of academic coursework at Technische Hochschule Deggendorf.

---

*For technical support or questions regarding this project, please contact any team member out of four listed above.*





# student-repo
 
This repository was created for you as part of a course project. You are required to use this project for any course work and contact 
the lecturer in case you encounter any problems with the settings and configuration of the project.

Any code or related work done in other, self-created Gitlab projects is **not considered for grading**.


