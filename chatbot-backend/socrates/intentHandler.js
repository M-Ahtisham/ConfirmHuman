const keywords = require('./keyword-spotter.json');
const room_details = require('./rooms.json');


// function to match message to keyword list
function messageMatchesKeywords(message, keywordList) {
  if (!Array.isArray(keywordList)) {
    return false;
  }
  for (let keyword of keywordList) {
    if (message.includes(keyword)) { // match found?
      return true;
    }
  }
  return false;
}


// Randomly pick a response, not sure if this is the best way
function getRandomResponse(arr) {
  if (!arr || arr.length === 0) return '';
  return arr[Math.floor(Math.random() * arr.length)];
}

function intentHandler(message, currentState = 'start', context = [0, null, null, null, null]) {
  const text = message.toLowerCase(); // maybe should trim this too?
  let [fallbacks, name, date, time, room] = context;

  let newState = currentState;
  let response = '';

  // fallback to start if state doesn't exist for some reason
  let currentStateData = keywords.states[currentState];
  if (!currentStateData) {
    currentStateData = keywords.states['start'];
  }

  // if user types "hint", show hint text
  if (text.includes("hint")) {
    let hint = currentStateData.hint;
    if (Array.isArray(hint)) {
      response = hint.join("\n");
    } else {
      response = hint || "You can ask something like checking or booking a room.";
    }
    return { response, newState, context: [fallbacks, name, date, time, room] };
  }

  // --- ask_name state ---
  if (currentState === 'ask_name') {
    // just grab name from sentence, might be buggy
    let nameMatch = message.toLowerCase().match(/(?:my name is|i am called|name is)\s+(.+)/);   // still buggy 😔
    if (nameMatch && nameMatch[1]) {
      name = nameMatch[1].trim(); // doesn't clean symbols yet
    } else {
      name = message; // fallback, just take whole thing
    }

    response = "Thank you " + name + ". When would you like to book the room?";
    newState = 'get_date';

    return { response, newState, context: [0, name, date, time, room] };
  }

  // --- get_date state ---
  if (currentState === 'get_date') {
    if (messageMatchesKeywords(text, currentStateData.keywords)) {
      date = message;
      response = "Okay perfect, so you want a room on " + date + ". On what time would you like to have it?";
      newState = 'get_time';
    } else {
      response = getRandomResponse(currentStateData.fallback);
      return { response, newState, context: [fallbacks + 1, name, date, time, room] };
    }

    return { response, newState, context: [0, name, date, time, room] };
  }

  // --- get_time state ---
  if (currentState === 'get_time') {
    if (messageMatchesKeywords(text, currentStateData.keywords)) {
      time = message;
      response = "Thank you, so which room are you looking for on " + date + " at " + time + ".";
      newState = 'get_room';
    } else {
      response = currentStateData.fallback;
      if (Array.isArray(response)) {
        response = getRandomResponse(response);
      }
      return { response, newState, context: [fallbacks + 1, name, date, time, room] };
    }

    return { response, newState, context: [0, name, date, time, room] };
  }

  // --- get_room state ---
  if (currentState === 'get_room') {
    if (messageMatchesKeywords(text, currentStateData.keywords)) {
      room = message;
      response = "Perfect, so you're looking for " + room + " on " + date + " at " + time + ". is that correct?";
      newState = 'show_availability'; // or maybe stay in get_room?
    } else {
      response = currentStateData.fallback;
      if (Array.isArray(response)) {
        response = getRandomResponse(response);
      }
      return { response, newState, context: [fallbacks + 1, name, date, time, room] };
    }

    return { response, newState, context: [0, name, date, time, room] };
  }

  // --- show_availability state ---
  if (currentState === 'show_availability') {
    if (messageMatchesKeywords(text, currentStateData.keywords)) {
      // get rooms from json
      let singleRooms = room_details.singleRooms;
      let groupRooms = room_details.groupRooms;

      // make a response string with all rooms
      response = "Here's a list of available rooms:\n\n";

      // list single rooms
      response += "Single Rooms:\n";
      for (let i = 0; i < singleRooms.length; i++) {
        response += "- " + singleRooms[i].location + "\n";
      }

      // list group rooms
      response += "\nGroup Rooms:\n";
      for (let i = 0; i < groupRooms.length; i++) {
        let room = groupRooms[i];
        let windowText = room.hasWindow ? "(with window)" : "(no window)";
        response += "- " + room.location + " " + windowText + "\n";
      }

      // go to next state
      newState = 'confirm_booking';
    } else {
      // fallback if input doesn’t match any keywords
      response = currentStateData.fallback;
      if (Array.isArray(response)) {
        response = getRandomResponse(response);
      }
      return { response, newState, context: [fallbacks + 1, name, date, time, room] };
    }

    // return updated response and context
    return { response, newState, context: [0, name, date, time, room] };
  }


  // --- transition handling ---
  if (currentStateData.transitions) {
    for (let targetState in currentStateData.transitions) {
      let triggers = currentStateData.transitions[targetState];
      for (let i = 0; i < triggers.length; i++) {
        if (text.includes(triggers[i])) {
          let nextStateData = keywords.states[targetState];
          if (nextStateData && nextStateData.responses) {
            response = getRandomResponse(nextStateData.responses);
            newState = targetState;
            return { response, newState, context: [0, name, date, time, room] };
          }
        }
      }
    }
  }

  // --- keyword matches for this state (generic) ---
  if (messageMatchesKeywords(text, currentStateData.keywords)) {
    response = getRandomResponse(currentStateData.responses);
    return { response, newState, context: [fallbacks, name, date, time, room] };
  }

  // --- final fallback ---
  if (!response) {
    if (fallbacks >= 2) {
      response = getRandomResponse(keywords.fallbacks.hard);
      newState = 'start';
      return { response, newState, context: [0, null, null, null, null] };
    } else {
      response = getRandomResponse(currentStateData.fallback || keywords.fallbacks.soft);
      return { response, newState, context: [fallbacks + 1, name, date, time, room] };
    }
  }

  return { response, newState, context: [fallbacks, name, date, time, room] };
}

module.exports = intentHandler;
