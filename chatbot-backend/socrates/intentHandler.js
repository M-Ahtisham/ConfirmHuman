const keywords = require('./keyword-spotter.json');

function intentHandler(message, currentState = 'start', context = [null, null, null, null]) {
  // const text = message.toLowerCase().replace(/[’']/g, '').replace(/[^\w\s]/g, '').trim();
  const text = message.toLowerCase().trim(); // Simple version for now

  const currentStateData = keywords.states[currentState] || keywords.states.start;

  const [name, date, time, room] = context;

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

  // We check when the user is asking for a hint about the chatbot
  if (text.includes('help') || text.includes('hint')) {
    return {
      // response: currentStateData.hint || " #FALLBACK! (Fix this later)# I can help you with room bookings.",
      response: currentStateData.hint || "I can help you with room bookings. Try asking about availability or how to book a room.",
      newState: currentState, // Stay in current state
      context: [name, date, time, room]
    };
  }

 
  // Specific state handling

  // For GET_NAME state
  if (currentState == "ask_name") {

    name = text.split(" ").map(word => {return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();}).join(" ");
    // The above method was taken from https://www.geeksforgeeks.org/javascript/convert-string-to-title-case-in-javascript/

    response = "Thank you " + name + ". On which day do you want the room?";
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

    time = text;

    response = "Thank you, so which room are you look for on " + date + " at " + time + "." ;
    newState = "get_room";
    
    return {
      response,
      newState,
      context: [fallbacks, name, date, time, room]
    }
  }

  // For the GET_ROOM
  if (currentState == "get_room") {

    room = text;

    response = "Thank you, so which room are you look for on " + date + " at " + time + "." ;
    newState = "check_availability";
    
    return {
      response,
      newState,
      context: [fallbacks, name, date, time, room]
    }
  }


  // 2. WE THEN CHECK FOR TRANSITION KEYWORDS
  if (currentStateData.transitions) {
    for (const transition in currentStateData.transitions) {
      const triggerWords = currentStateData.transitions[transition];
      for (const word of triggerWords) {
        // const cleanWord = word.toLowerCase().replace(/[’']/g, '').replace(/[^\w\s]/g, '').trim();
        const cleanWord = word.toLowerCase().trim(); // simple for now
        if (text.includes(cleanWord)) {
          useFallback = false;
          matchedTransition = transition;
          break;
        }
      }
      if (matchedTransition) break;
    }
  }

  // Handle matched transition
  if (!useFallback && matchedTransition) {
    const nextStateData = keywords.states[matchedTransition];
    
    // Select random response from available options
    const possibleResponses = nextStateData.responses || ["Okay, let's continue."]; // fallback if no responses defined
    response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    
    return {
      response,
      newState: matchedTransition,
      context: [name, date, time, room]
    };
  }

  // Handle case where we're staying in current state (keywords matched but no transition)
  if (!useFallback && !matchedTransition) {
    const possibleResponses = currentStateData.responses || ["Got it!"];
    response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    
    return {
      response,
      newState: currentState,
      context: [name, date, time, room]
    };
  }

  // Handle fallback cases
  // const fallbackResponses = keywords.fallbacks?.soft || [
  //   "I'm not sure I understand. Could you rephrase that?",
  //   "I didn't quite get that. Could you say it differently?"
  // ];
  const fallbackResponses = keywords.fallbacks?.soft || [
    "I'm not sure I understand. Could you rephrase that?",
    "I didn't quite get that. Could you say it differently?"
  ];
  
  response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];


  response = response.replace("{name}", name);
  response = response.replace("{date}", date);
  response = response.replace("{time}", time);
  response = response.replace("{room}", room);


  return {
    response,
    newState: currentState,
    context: [name, date, time, room]
  };
}

module.exports = intentHandler;