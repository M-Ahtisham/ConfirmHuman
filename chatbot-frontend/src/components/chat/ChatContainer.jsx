import React from 'react';
import ChatCard from './ChatCard';


export default function ChatContainer() {
  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-red-500
        from-brand-50 via-indigo-300 to-brand-500
        p-4
      "
    >
      <ChatCard />
    </div>
  );
}
