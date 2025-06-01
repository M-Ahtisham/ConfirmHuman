const MAX_FALLBACK_ATTEMPTS = 3; // we need to have another meeting to confirm how many
const userStates = {};

function detectIntent(message) {
    const lowered = message.toLowerCase();

    if (lowered.includes("room")) return "book_room";
    if (lowered.includes("time")) return "show_time";

    return null;
}

function handleMessage(userId, message) {
    if (!userStates[userId]) 
        userStates[userId] = { fallbackCount: 0 };

    const intent = detectIntent(message);

    if (!intent) {
        userStates[userId].fallbackCount += 1;

        if (userStates[userId].fallbackCount >= MAX_FALLBACK_ATTEMPTS) {
            userStates[userId].fallbackCount = 0;
            return { response: "I'm having trouble understanding. Let's start over.", restart: true };
        } else {
            return { response: "I didn’t understand that. Can you rephrase it?" };
        }
    }
}
