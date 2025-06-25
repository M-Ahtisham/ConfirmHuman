const keywords = require('./keyword-spotter.json');

function intentHandler(message, currentState = 'start', context = [null, null, null, null]) {
  const text = message.toLowerCase();
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
      response: currentStateData.hint || " #FALLBACK! (Fix this later)# I can help you with room bookings. You can ask about availability or make a booking.", // Fallback if hint is missing
      newState: currentState, // Stay in current state
      context: [name, date, time, room]
    };
  }


  // First current check state keywords (if they exist)
  if (currentStateData.keywords) {
    for (const keyword of currentStateData.keywords) {
      if (text.includes(keyword)) {
        useFallback = false;
        break;
      }
    }
  }

  // We then check transitions (if keywords matched or state doesn't have keywords)
  if (!useFallback || !currentStateData.keywords) {
    if (currentStateData.transitions) {
      for (const [transition, triggerWords] of Object.entries(currentStateData.transitions)) {
        for (const word of triggerWords) {
          if (text.includes(word)) {
            useFallback = false;
            matchedTransition = transition;
            break;
          }
        }
        if (matchedTransition) break;
      }
    }
  }

  // Handle matched transition
  if (!useFallback && matchedTransition) {
    const nextState = matchedTransition;
    const nextStateData = keywords.states[nextState];
    
    // Select random response from available options
    const possibleResponses = nextStateData.responses || [];
    response = possibleResponses.length > 0 
      ? possibleResponses[Math.floor(Math.random() * possibleResponses.length)]
      : '';
    
    return {
      response,
      newState: nextState,
      context: [name, date, time, room]
    };
  }

  // Handle case where we're staying in current state (keywords matched but no transition)
  if (!useFallback && !matchedTransition) {
    const possibleResponses = currentStateData.responses || [];
    response = possibleResponses.length > 0 
      ? possibleResponses[Math.floor(Math.random() * possibleResponses.length)]
      : '';
    
    return {
      response,
      newState: currentState,
      context: [name, date, time, room]
    };
  }

  // Handle fallback cases
  if (useFallback) {
    // First try soft fallback
    const fallbackResponses = keywords.fallbacks?.soft || [
      "I'm not sure I understand. Could you rephrase that?",
      "I didn't quite get that. Could you say it differently?"
    ];
    
    response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

    // If we've hit multiple fallbacks in a row, consider hard fallback
    // (This would require tracking conversation history, not implemented here)
    
    return {
      response,
      newState: currentState,
      context: [name, date, time, room]
    };
  }
}

module.exports = intentHandler;