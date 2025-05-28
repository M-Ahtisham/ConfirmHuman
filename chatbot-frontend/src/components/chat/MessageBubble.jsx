import React from 'react';

export default function MessageBubble({ from, type, text }) {
  const isUser = from === 'user';
  const bubbleStyle = isUser
    ? 'bg-blue-500 text-white self-end'
    : 'bg-gray-200 text-black self-start';

  return (
    <div className={`max-w-[75%] p-3 rounded-bubble ${bubbleStyle}`}>
      {type === 'text' && <p className="whitespace-pre-wrap">{text}</p>}
    </div>
  );
}
