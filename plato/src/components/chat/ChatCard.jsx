import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import MessageList from './MessageList';
import handleAIChatWithGemini from './GeminiAIChat';
import prompt from '../prompt';
import useAIChatWithGemini from './GeminiAIChat';

const socket = io("");
export default function ChatCard() {
  const [messages, setMessages] = useState([
    { from: 'bot', type: 'text', text: 'Hi I am Plato! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');

  const {  isLoading, mutateAsync } = useAIChatWithGemini(input);

  useEffect(() => {
    socket.on('bot_message', (msg) => {
      setMessages((prev) => [...prev, { from: 'bot', type: 'text', text: msg }]);
    });
    return () => socket.off('bot_message');
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { from: 'user', type: 'text', text: input }]);
    setInput('');

   const data =  await mutateAsync(`${prompt} History of the conversation: ${JSON.stringify(messages)} \n Now my query is: ${input}`);
    if (data) {
      setMessages((prev) => [...prev, { from: 'bot', type: 'text', text: data }]);
    }
  };

  return (
    <div className="w-full h-[600px] flex flex-col bg-white/90 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden">
      <MessageList messages={messages} />
      <div className="flex p-3 border-t bg-white">
        <input
          className="flex-1 px-4 py-2 border rounded-l-md outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r-md"
          disabled={isLoading}
          onClick={sendMessage}
        >
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
