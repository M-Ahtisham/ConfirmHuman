# ConfirmHuman - SOCRATES

## BACKEND 

This directory contains the backend components for the ConfirmHuman project. It consists of two subdirectories, each responsible for different parts of the backend logic.

### Socrates

Socrates is the solution to **Task 1**. It is a simple rule-based ChatBot that detects user intent through **keyword spotting** and provides responses based on predefined logic.

The primary logic of the ChatBot is implemented in the `intentHandler.js` file, which maps detected keywords from the `keyword-spotter.json` to specific responses.

### Key Features:

- Intent detection using basic keyword spotting.
- Hardcoded response generation based on detected intent.
- Lightweight and easy to understand structure.
- Found on the `main` branch.

### Directory Structure:

```
|-- README.md
|-- socrates
    |-- IMG_2689C0FE819B-1.jpeg
    |-- intentHandler.js
    |-- keyword-spotter.json
    |-- package-lock.json
    |-- package.json
    |-- public
    │   |-- asset-manifest.json
    │   |-- index.html
    │   |-- static
    │       |-- css
    │       │   |-- main.aa56d37c.css
    │       │   |-- main.aa56d37c.css.map
    │       |-- js
    │       │   |-- main.2852a295.js
    │       │   |-- main.2852a295.js.LICENSE.txt
    │       │   |-- main.2852a295.js.map
    │       |-- media
    │           |-- Deus_Socrates.6b24d9b8b5f842cdf6b3.png
    │           |-- Spartacus.75f046276174e022f966.ttf
    |-- rooms.json
    |-- rules.json
    |-- server.js
```


### Sample conversation

#### **Example 1:**
> **Bot:** Hi there, I am Socrates, Your ITC room booking assistant. How can I help you today?    
> **User:** Hellow  
> **Bot:** Hello, my name is Socrates. I can help you with booking the rooms in the University  
> **User:** okay how?  
> **Bot:**  I am not sure what you mean, can you please rephrase that. You can tell me something like 'I want to book a room' Or type 'hint' at to get more information  
> **User:** give me a hint  
> **Bot:** You can tell me to help you with booking a room in the ITC building  
> **User:** okay help me book a room then  
> **Bot:** Sure, Can you please provide me with your name.  
> **User:** my name is jamal dassrath  
> **Bot:** Thank you Jamal Dassrath. When would you like to book the room?  
> **User:** 7th july  
> **Bot:**  Okay perfect, so you want a room on 7th july.  On what time would you like to have it?  
> **User:**  2pm  
> **Bot:**  Thank you, so which room are you looking for on 7th july at 2pm.  
> **User:** g2  
> **Bot:**  Perfect, so youre looking for g2 on 7th july at 2pm. is that correct?  
> **User:** yes thats correct  
> **Bot:**  Booking confirmed! You have Room g2 on 7th july at 2pm.  
> **User:** thank you  


#### **Example 2:**
> **Bot:** Hi there, I am Socrates, Your ITC room booking assistant. How can I help you today?  
> **User:** hey socrates  
> **Bot:**   Hey there, I'm Socrates, your booking assistant for the ITC building. I can help you book available single rooms (C1-C9) or group rooms (G1-G10). How can i help you!  
> **User:**  i need a room   
> **Bot:** Sure, Can you please provide me with your name.  
> **User:** name is erbakan ahmad  
> **Bot:** Thank you Erbakan Ahmad. When would you like to book the room?  
> **User:** tomorrow     
> **Bot:** Okay perfect, so you want a room on tomorrow.  On what time would you like to have it? 
> **User:** 10am   
> **Bot:** Thank you, so which room are you looking for on tomorrow at 10am.    
> **User:** c8   
> **Bot:** Perfect, so youre looking for c8 on tomorrow at 10am. is that correct?
> **User:** nah nevermind  
> **Bot:**  I am not sure what you mean, can you please rephrase that. Or type 'hint' at to get more information   
> **User:**  give me a hint    
> **Bot:** I can help you with room bookings. You can ask about availability or make a booking.  
> **User:** no i need to book another room   
> **Bot:** Hey there, I'm Socrates, your booking assistant for the ITC building. I can help you book available single rooms (C1-C9) or group rooms (G1-G10). How can i help you!    
> **User:** book a new room     
> **Bot:** Yeah sure, Can you tell me what your name is?  
> **User:** erbakan  
> **Bot:**  Thank you Erbakan Ahmad. When would you like to book the room?  
> **User:** tomorrow     
> **Bot:** Okay perfect, so you want a room on tomorrow.  On what time would you like to have it?  
> **User:** on thursday     
> **Bot:** Please write the time correctly (e.g., 10:00, 2pm, 14:30).  
> **User:**  2am
> **Bot:** Thank you, so which room are you looking for on tomorrow at 2am.
> **User:** g3     
> **Bot:** Perfect, so youre looking for g3 on tomorrow at 2am. is that correct?  
> **User:**  yes    
> **Bot:**  Your reservation for g3 is complete. A confirmation has been sent to your email.


### Limitations:

- Relies on hardcoded keywords and responses.
- Doesnt understand other languages
- Generates the response based on the first dectected keyword and ignores the ones that follow it
- Cannot handle complex user queries or natural language understanding.
- No learning or adaptability — purely rule-based.

### How we Improved it
- We developed a bette ChatBot called Plato
- It used Gemini API, the code to this can be found in the other branch

---

For more details on setting up and running the project, refer to the project-wide README or documentation.

