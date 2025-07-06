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
> **Bot:** Hi I am Socrates! How can I help you today?
> **User:** Hellow  
> **Bot:** Hello, my name is Socrates. I can help you with booking the rooms in the University  
> **User:** Sure, which rooms are available

(TO BE FINISHED LATER)

#### **Example 2:**
> **Bot:** Hi I am Socrates! How can I help you today?
> **User:** Hey  

(TO BE FINISHED LATER)

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

