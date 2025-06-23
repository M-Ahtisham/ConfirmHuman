const keywords = require('./keyword-spotter.json');

function intentHandler(message, currentState = 'start') {
  const text = message.toLowerCase();
  const currentStateData = keywords.states[currentState] || keywords.states.start;
  
  // We check if we should use a fallback
  let useFallback = true;
  let matchedTransition = null;
  let response = '';

  // We check when the user is asking for a hint about the chatbot

  if (text.includes('help') || text.includes('hint')) {
    return {
      response: currentStateData.hint || " #FALLBACK!# I can help you with room bookings. You can ask about availability or make a booking.", // Fallback if hint is missing
      newState: currentState // Stay in current state
    };
  }


  // First check state keywords (if they exist)
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
      newState: nextState
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
      newState: currentState
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
      newState: currentState
    };
  }
}

module.exports = intentHandler;