const rooms = require('./rooms.json');
const rules = require('./rules.json');

function intentHandler(message) {
  const text = message.toLowerCase();

  if (text.includes('available') && text.includes('room')) {
    const group = rooms.groupRooms.map(r =>
      `${r.location}${r.hasWindow === false ? ' (no window)' : ''}`
    ).join(', ');

    const single = rooms.singleRooms.map(r => r.location).join(', ');

    return `Available Rooms:\n• Group: ${group}\n• Single: ${single}`;
  }

  if (text.includes('rules')) {
    return `Booking Rules:
- Reservation: ${rules.reservation.withReservation.time} (${rules.reservation.withReservation.days.join(', ')})
- Without reservation: ${rules.reservation.withoutReservation.mondayToThursday} (Mon–Thu), ${rules.reservation.withoutReservation.friday} (Fri)
- Return Deadline: ${rules.reservation.returnDeadline}`;
  }

  if (text.includes('book')) {
    return `Please tell me which room you'd like to book. Pickup is possible from 16:30–17:30.`;
  }

  if (text.includes('printer')) {
    return `The multifunction printer is located in the ${rules.printer.location} and is named "${rules.printer.printerName}".`;
  }

  if (text.includes('emergency')) {
    return `Emergency Info:
- Phones: ${rules.emergency.emergencyPhoneLocation.join(', ')}
- Call 110 (police) or 112 (fire)
- ${rules.emergency.alarmProcedure}`;
  }

  return `I'm not sure I understood. Could you rephrase that?`;
}

module.exports = intentHandler;
