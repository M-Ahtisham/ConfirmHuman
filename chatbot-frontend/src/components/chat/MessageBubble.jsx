import React from 'react';

export default function MessageBubble({ from, type, text }) {
  const isUser = from === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] p-3 rounded-xl animate-in ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {type === 'text' && <p className="whitespace-pre-wrap">{text}</p>}
      </div>
    </div>
  );
}
