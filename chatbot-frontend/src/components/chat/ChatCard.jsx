import React from 'react';

export default function ChatCard() {
  return (
    <div
      className="
        w-full max-w-2xl h-[600px]
        flex flex-col
        bg-white/90 backdrop-blur-md
        shadow-xl rounded-2xl
        overflow-hidden
      "
    >
      <div className="flex-1 grid place-items-center text-gray-400">
        <p>Chat</p>
      </div>
    </div>
  );
}
