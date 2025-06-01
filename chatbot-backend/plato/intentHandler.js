const MAX_FALLBACK_ATTEMPTS = 3;
const userStates = {};

function detectIntent(message) {
    const lowered = message.toLowerCase();

    if (lowered.includes("room")) return "book_room";
    if (lowered.includes("time")) return "show_time";

    return null;
}

