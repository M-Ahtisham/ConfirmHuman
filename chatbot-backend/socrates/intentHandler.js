const keywords = require('./keyword-spotter.json'); 
// This file imported above is the most important, it contains the states the chatbot can be in
// For each state, there are some keywords, hints, fallbacks and transition-keywords

// We also need to think of a better name for the keyword-spotter file

function intentHandler(message, currentState = 'start', context = [0, null, null, null, null]) { // This is the main brain/logic of the chatbot 
  const text = message.toLowerCase(); // all the keywords are lowercase
  const currentStateData = keywords.states[currentState] || keywords.states.start; 

  let [fallbacks, name, date, time, room] = context; // The variable that stores all the info about the current room the user is talking about

  
  // This is for debugging purposes only.
  console.log("Current State:", currentState)
  console.log("Data:", currentStateData)
  console.log("Fallbacks:", fallbacks);
  console.log("Name     :", name);
  console.log("Date     :", date);
  console.log("Time     :", time);
  console.log("Room     :", room);
  console.log();                              // Empty line to separeate

  let useFallback = true; // This variables helps us know if we need to use a fallback, default is true unless a keyword is detected
  let matchedTransition = null;
  let response = ''; // Response is empty by default

  let newState = currentState; // Initialize newState to currentState



  // 1. HINT 
  // First thiing is to check if user is asking for a hint
  if (text.includes('hint')) {
    response = currentStateData.hint || "I can help you with room bookings. You can ask about availability or make a booking.";
    return {
      response,
      newState: currentState,
      context: [fallbacks, name, date, time, room]
    };
  }





  // Specific state handling

  // For GET_NAME state
  if (currentState == "ask_name") {

    for (const keyword of currentStateData.keywords || ['my name is ', 'name is', 'i am called ']) {
      if (text.startsWith(keyword)) {
        // Remove the keyword from the start of the text
        name = text.slice(keyword.length).trim();
        break;
      }
    }
    if (!name) {
      name = text;
    }

    // Converts the name into a Title Case
    name = name.split(" ").map(word => {return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();}).join(" ");


    response = "Thank you " + name + ". When would you like to book the room? ";
    newState = "get_date";

    return {
      response,
      newState,
      context: [fallbacks, name, date, time, room]
    }
  }


  // For GET_DATE state
  if (currentState == "get_date") {

    date = text;

    response = "Okay perfect, so you want a room on " + date + ".  On what time would you like to have it?";
    newState = "get_time";
    
    return {
      response,
      newState,
      context: [fallbacks, name, date, time, room]
    }
  }


  // For GET_TIME state
  if (currentState == "get_time") {

    // Basic time validation: check if input contains numbers and optionally am/pm
    if (/\d/.test(text)) {
      time = text.trim();
      response = "Thank you, so which room are you looking for on " + date + " at " + time + ".";
      newState = "get_room";
    } else {
      response = "Please write the time correctly (e.g., 10:00, 2pm, 14:30).";
      newState = "get_time";
    }
    
    return {
      response,
      newState,
      context: [fallbacks, name, date, time, room]
    }
  }

  // For the GET_ROOM
  if (currentState == "get_room") {

    room = text;

    response = "Perfect, so youre looking for " + room + " on " + date + " at " + time + ". is that correct?";
    newState = "confirm_booking";
    
    return {
      response,
      newState,
      context: [fallbacks, name, date, time, room]
    }
  }


  // 2. WE THEN CHECK FOR TRANSITION KEYWORDS
  if (currentStateData.transitions) {
    for (const [transition, triggerWords] of Object.entries(currentStateData.transitions)) {
      for (const word of triggerWords) {
        if (text.includes(word)) {
          useFallback = false;
          matchedTransition = transition;
          newState = transition; // Update to the new state
          // Get response from the new state's responses array
          const newStateData = keywords.states[transition] || keywords.states.start;
          response = newStateData.responses?.length 
            ? newStateData.responses[Math.floor(Math.random() * newStateData.responses.length)] 
            : "Transitioned to " + transition + ". How can I assist you now?";
          break;
        }
      }
      if (matchedTransition) break;
    }
  }

  // 3. CHECKING FOR CURRENT STATE KEYWORDS
  if (useFallback && currentStateData.keywords?.length) {
    for (const keyword of currentStateData.keywords) {
      if (text.includes(keyword)) {
        useFallback = false;
        response = currentStateData.responses?.length 
          ? currentStateData.responses[Math.floor(Math.random() * currentStateData.responses.length)] 
          : "I recognize your input, but I don't have a specific response. Try asking about room bookings.";
        break;
      }
    }
  }

  // 4. HANDLING OF THE  FALLBACK IF NONE OF THE KEYWORDS WAS FOUND
  if (useFallback) {

    // If the state has a specific fallback, we will return that, otherwise the deault fallback.
    if (fallbacks < 3) {
      fallbacks += 1;
      response = currentStateData.fallback || "I am not sure what you mean, can you please rephrase that. Or type 'hint' at to get more information";
    } 
    
    else { // This is the hard fallback (Reset)
      fallbacks = 0; // Reset fallbacks
      newState = 'start'; // Reset to start state
      name, date, time, room = null, null, null, null; 
      response = "I've tried to understand, but I'm still confused. Let's start over. Type 'hint' for guidance.";
    }
  }

  
  // If user says nevermind ot start over
  if (currentState == "back_to_start") {

    response = "No problem, let's try again";
    newState = "start";

    return {
      response,
      newState,
      context: [0, null, null, null, null] // This will just delete everything from memory
    } 
  }

  // Replace placeholders in the response with actual values
  if (response.includes("{name}")) {
    response = response.replace(/{name}/gi, name ? name : "");
  }
  if (response.includes("{date}")) {
    response = response.replace(/{date}/gi, date ? date : "");
  }
  if (response.includes("{time}")) {
    response = response.replace(/{time}/gi, time ? time : "");
  }
  if (response.includes("{room}")) {
    response = response.replace(/{room}/gi, room ? room : "");
  }


  return {
    response,
    newState,
    context: [fallbacks, name, date, time, room]
  };
}

module.exports = intentHandler;