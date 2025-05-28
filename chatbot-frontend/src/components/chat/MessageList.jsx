import React from 'react';
import MessageBubble from './MessageBubble';

export default function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-hidden">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} from={msg.from} type={msg.type} text={msg.text} />
      ))}
    </div>
  );
}
