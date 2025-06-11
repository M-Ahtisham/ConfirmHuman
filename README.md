# ConfirmHuman - University Rooms Booking Chatbot

## Project Overview

**ConfirmHuman** is an intelligent chatbot designed to assist students and staff at TH Deggendorf with university room booking and availability inquiries. The chatbot provides real-time information about room reservations, availability schedules, ongoing lectures, and booking conflicts.

### Key Features
- **Room Availability Checking**: Instantly check if specific rooms are available
- **Schedule Information**: View when rooms will be free or occupied
- **Booking Conflict Detection**: Identify overlapping reservations and lectures
- **Real-time Updates**: Get current status of room bookings and usage
- **Interactive Q&A**: Supports 20+ question-answer conversation turns
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices

### Use Cases
- Students looking for available study rooms
- Staff checking meeting room availability
- Professors verifying classroom schedules
- Event organizers seeking suitable venues
- General room booking inquiries and assistance

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
- [x] University room booking domain-specific conversations
- [x] Aggressive conversation steering through targeted questions
- [x] Intent understanding from user utterances
- [x] Soft fallback for misunderstood inputs
- [x] Hard fallback for repeated conversation failures
- [x] Room availability and scheduling task completion
- [x] Conversation history memory
- [x] 20+ Q&A turn capacity
- [x] Non-repetitive responses (except fallbacks)
- [x] Modern, responsive user interface
- [x] Alternating question-answer display format

### Technical Requirements
- [x] HTML5 frontend implementation
- [x] CSS-based responsive layout
- [x] React framework with 4+ components
- [x] Socket.IO and WebSocket communication
- [x] Node.js backend (version 22.14.0 LTS)
- [x] Express.js server implementation
- [x] Keyword-spotting intent identification
- [x] Extensible architecture for new intents/topics
- [x] Bootstrap 5 integration for modern UI
- [x] Clean, maintainable code structure

### Deployment Requirements
- [x] Microsoft Azure cloud deployment
- [x] Public URL accessibility
- [x] SSL/TLS encryption
- [x] Azure for Students subscription utilization

## Quick Start

For detailed setup instructions, please refer to [SETUP.md](SETUP.md).

### Basic Commands
```bash
# Clone the repository
git clone https://mygit.th-deg.de/aw-student-projects/ain-internet-technologies/ss25/ConfirmHuman.git

# Install dependencies
cd ConfirmHuman/chatbot-backend && npm install
cd ../chatbot-frontend && npm install

# Run the application
# Terminal 1: Backend
cd chatbot-backend && npm start

# Terminal 2: Frontend  
cd chatbot-frontend && npm start
```

## Chatbot Capabilities

### Room Information Queries
- "Is room A101 available now?"
- "When will room B205 be free?"
- "Are there any lectures in room C301 today?"
- "Show me available meeting rooms for 2 PM"

### Booking Assistance
- Check reservation conflicts
- Suggest alternative rooms
- Provide scheduling information
- Assist with booking procedures

### Schedule Management
- Display daily room schedules
- Show upcoming reservations
- Identify free time slots
- Alert about booking conflicts

## Architecture

```
┌─────────────────┐    Socket.IO    ┌─────────────────┐
│   React Client  │ ←────────────→  │   Node.js API   │
│   (Frontend)    │   WebSocket     │   (Backend)     │
└─────────────────┘                 └─────────────────┘
         │                                   │
         │                                   │
    ┌────▼────┐                         ┌────▼────┐
    │   UI    │                         │ Intent  │
    │Components│                         │Handler  │
    └─────────┘                         └─────────┘
                                             │
                                        ┌────▼────┐
                                        │Keyword  │
                                        │Spotter  │
                                        └─────────┘
```

## File Structure

```
ConfirmHuman/
├── chatbot-backend/
│   └── socrates/
│       └── intentHandler.js
├── chatbot-engine/
│   ├── keyword-spotter.yml
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
- **Performance**: Optimize for real-time communication

## Live Demo

The deployed chatbot is accessible at: [URL provided in url.txt]

## Course Information

- **Course**: Internet Technologies
- **Professor**: Prof. Dr. Andreas Wölfl
- **Institution**: Technische Hochschule Deggendorf
- **Semester**: Summer Semester 2025
- **Project Type**: Praktikumsleistung (PrL)

## License

This project is developed as part of academic coursework at TH Deggendorf.

---

*For technical support or questions regarding this project, please contact any team member listed above.*





# student-repo
 
This repository was created for you as part of a course project. You are required to use this project for any course work and contact 
the lecturer in case you encounter any problems with the settings and configuration of the project.

Any code or related work done in other, self-created Gitlab projects is **not considered for grading**.








# student-repo
 
This repository was created for you as part of a course project. You are required to use this project for any course work and contact 
the lecturer in case you encounter any problems with the settings and configuration of the project.

Any code or related work done in other, self-created Gitlab projects is **not considered for grading**.

