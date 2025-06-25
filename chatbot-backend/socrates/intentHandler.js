const keywords = require('./keyword-spotter.json');

function intentHandler(message, currentState = 'start', context = [null, null, null, null]) {
  // const text = message.toLowerCase().replace(/[’']/g, '').replace(/[^\w\s]/g, '').trim();
  const text = message.toLowerCase().trim(); // Simple version for now

  const currentStateData = keywords.states[currentState] || keywords.states.start;

  const [name, date, time, room] = context;

  console.log("Name:", name);
  console.log("Date:", date);
  console.log("Time:", time);
  console.log("Room:", room);  

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

  // First current check state keywords (if they exist)
  if (currentStateData.keywords) {
    for (const keyword of currentStateData.keywords) {
      // const cleanKeyword = keyword.toLowerCase().replace(/[’']/g, '').replace(/[^\w\s]/g, '').trim();
      const cleanKeyword = keyword.toLowerCase().trim(); // easier version for now
      if (text.includes(cleanKeyword)) {
        useFallback = false;
        break;
      }
    }
  }

  // We then check transitions (if keywords matched or state doesn't have keywords)
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

  return {
    response,
    newState: currentState,
    context: [name, date, time, room]
  };
}

module.exports = intentHandler;