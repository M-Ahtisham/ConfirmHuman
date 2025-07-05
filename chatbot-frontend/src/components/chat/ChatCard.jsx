import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import MessageList from './MessageList.jsx'; 

const socket = io(""); // forr deployment as professor said

export default function ChatCard() {
  const [messages, setMessages] = useState([
    { from: 'bot', type: 'text', text: 'Greetings I am Plato! How may I assist thee?' },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('bot_message', (msg) => {
      setMessages((prev) => [...prev, { from: 'bot', type: 'text', text: msg }]);
    });
    return () => socket.off('bot_message'); 
  }, []); 

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { from: 'user', type: 'text', text: userMsg }]);
    socket.emit('user_message', userMsg);
    setInput('');
  };

  return (

    // chat container and Banner
    <div className="w-full h-[600px] flex flex-col rgb(129, 23, 4)/60 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden glow-animation">

      <div className="flex flex-col w-full h-full overflow-hidden rounded-2xl">
        <div className="bg-[#0ABAB5]/10 text-gray-800 p-4 text-center text-4xl font-bold shadow-md rounded-t-2xl
                    hover:shadow-[#F08080]/50 hover:shadow-2xl transition-shadow duration-300 ease-in-out font-spartacus">
          PLATO
        </div>

        {/* chatbot width and height. */}
        <div className="flex-1 overflow-y-auto px-1 py-2 space-y-3 scrollbar-autohide">
          <MessageList messages={messages} />
        </div>

        {/* Input and Send Button Bar */}
        <div className="flex p-3 border-t border-gray-200 bg-white/5 backdrop-blur-xl items-center">
          <input
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 ease-in-out text-gray-800 placeholder-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="ml-3 bg-[#56DFCF] hover:bg-[#0ABAB5] text-gray-800 font-semibold py-2 px-6 rounded-full transition-all duration-200 ease-in-out shadow-md hover:shadow-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}