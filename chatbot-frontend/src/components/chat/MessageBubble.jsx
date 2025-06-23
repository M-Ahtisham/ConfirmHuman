import React from 'react';
import { FaUser } from 'react-icons/fa';
import botIcon from '../assets/Deus_Socrates.png'; 

export default function MessageBubble({ from, type, text }) {
  const isUser = from === 'user';

  const bubbleStyles = {
    user: {
      bg: 'bg-blue-600',
      text: 'text-white',
      icon: <FaUser className="h-12 w-6" />, // User icon from https://fontawesome.com/icons/user?f=classic&s=solid (also guy check out others and tell me which ones you llike better )
    },
    bot: {
      bg: 'bg-emerald-100',
      text: 'text-gray-800',
      icon: <img src={botIcon} alt="Bot" className="h-14 w-14 object-contain" />, // Bot image from https://commons.wikimedia.org/wiki/File:Deus_Socrates.png
      rounded: 'rounded-tl-none'
    }
  };

  const currentStyle = isUser ? bubbleStyles.user : bubbleStyles.bot;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      
      {!isUser && (
        <div className="flex-shrink-0 mr-2 self-end">
          {currentStyle.icon}
        </div>
      )}

      <div 
        className={`flex items-center max-w-[85%] p-3 rounded-lg ${currentStyle.bg} ${currentStyle.text} ${currentStyle.rounded} shadow-sm`}
      >
        <p className="whitespace-pre-wrap break-words">{text}</p>
      </div>

      {isUser && (
        <div className="flex-shrink-0 ml-2 self-end">
          {currentStyle.icon}
        </div>
      )}
    </div>
  );
}