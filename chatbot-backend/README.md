# ConfirmHuman - PLATO

### Plato

This branch is the solution to Task 3 by using the Gemini API (Gemini 2.5 Flash-Lite Preview 06-17) for better natural language understanding and support for multiple languages. This ChatBot can handle complex questions and different languages, making it more useful for students and staff at TH Deggendorf. The Gemini API allows only 15 queries per minute and 500 per day.

### Key Features:

- Intent detection using Gemini LLM
- Hardcoded response generation based on detected intent.
- Lightweight and easy to understand structure.
- Found on the `main` branch.

### Directory Structure:

```
├── plato
│   ├── package-lock.json
│   ├── package.json
│   ├── prompt.js
│   ├── public
│   │   ├── asset-manifest.json
│   │   ├── index.html
│   │   └── static
│   │       ├── css
│   │       │   ├── main.0fe76c33.css
│   │       │   └── main.0fe76c33.css.map
│   │       ├── js
│   │       │   ├── main.564d45d9.js
│   │       │   ├── main.564d45d9.js.LICENSE.txt
│   │       │   └── main.564d45d9.js.map
│   │       └── media
│   │           ├── Plato.1ae8c8fb2ad5d4690f8a.png
│   │           └── Spartacus.75f046276174e022f966.ttf
│   └── server.js
└── README.md
```


### How it works
- We pass in a prompt to the Gemini together with the history of the chat and the current querry


### Sample conversation

#### **Example 1:**
> **Bot:** Greetings! I am Plato. How may I assist thee?  
> **User:** i dont know, what can you do  
> **Bot:** Hello! I am Plato, your booking assistant for the ITC building. To help you book a room, could you please tell me your name?  
> **User:** my name is jamal dassrath  
> **Bot:** Hello Jamal, it's a pleasure to assist you. Would you like to book a room in the ITC building?  
> **User:** yeah sure  
> **Bot:** Great, Jamal! Do you require a single room or a group room?  
> **User:** ill go with a group room, how big are they?  
> **Bot:** Our group rooms are G1 through G10, and G7-G10 have windows. What date and time would you like to book a group room?  
> **User:** ill take any room with a window  
> **Bot:** Jamal, you can book group rooms G7, G8, G9, or G10 as they have windows. Which of these rooms would you prefer, and what date and time are you looking to book?  
> **User:** lets do G9 then  
> **Bot:** Certainly, Jamal. What date and time would you like to book G9?  
> **User:** i need it for tommorow  
> **Bot:** Jamal, time is relative! Could you please provide the exact date you wish to book G9?  
> **User:** 7th July i mean  
> **Bot:** Jamal, I see you've specified July 7th. What time on July 7th would you like to book room G9?  
> **User:** at 2pm? what time is it available  
> **Bot:** Jamal, G9 is available on July 7th from 17:30 to 20:00. Would this time slot work for you?  
> **User:** yeah sure, that works  
> **Bot:** Excellent, Jamal! To confirm, you would like to book room G9 on July 7th from 17:30 to 20:00. Is this correct?  
> **User:** no i think ill need a single room instead  
> **Bot:** Jamal, understood. Do you require a single room or a group room?  
> **User:** a single room, which optioins are there  
> **Bot:** Jamal, we have single rooms C1 through C9 available. Which of these would you like to book?  
> **User:** C8 for the same time i mentioned before  
> **Bot:** Jamal, you would like to book single room C8 on July 7th from 17:30 to 20:00. Is this correct?  
> **User:** yeah perfect, that will work for me  
> **Bot:** Jamal, your booking for single room C8 on July 7th from 17:30 to 20:00 is confirmed. You will need to collect the key from the THD Library using your student ID between 09:00 and 14:00. Would you like any information on how to get to C8 or information on the rules of conduct?  
> **User:** yeah tell me  
> **Bot:** Jamal, to get to room C8, when looking at the Glashaus from the library, it is on the left of the Glashaus. Would you like to know the emergency information or the rules of conduct?  
> **User:** yeah what is it  
> **Bot:** Jamal, the rules of conduct include not passing keys or student IDs to others, maintaining silence in the ITC2 library, and not bringing kettles, fans (except small table fans), or alcohol. You should also report any damage immediately, close windows and doors before leaving, keep tables clean, dispose of trash properly, and not rearrange chairs and tables.  
> **User:** awesome, thank you so much  
> **Bot:** Jamal, you're most welcome! Remember to bring your student ID to the THD Library to collect your key. Enjoy your booking!  
> **User:** by the way, is there any emergency information i should know?  
> **Bot:** Jamal, in case of an emergency, the phone locations are at the entrance (left) and near G11. The emergency numbers are Facility Management at 0180 2000070, Police at 110, and Fire at 112. In case of an alarm, leave the building immediately and only re-enter after the signal stops.  



### Advantages:
- Plato can understand multiple languages 
- It can support up to 15 querries a minute

---

For more details on setting up and running the project, refer to the project-wide README or documentation.
