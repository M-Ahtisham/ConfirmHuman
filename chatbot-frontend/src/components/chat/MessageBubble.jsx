import React from 'react';
import { VscAccount } from "react-icons/vsc";
import botIcon from '../assets/Deus_Socrates.png';
import TypewriterText from './TypewriterText';

export default function MessageBubble({ from, type, text }) {
  const isUser = from === 'user';

  const bubbleStyles = {
    user: {
      // change number inside [] for bubble colour
      bg: 'bg-[#7FF0F0]',
      text: 'text-gray-800',
      icon: <VscAccount className="h-10 w-10" />,
    },
    bot: {
      // change number inside [] for bubble colour
      bg: 'bg-[#F08080]',
      text: 'text-gray-800',
      icon: <img src={botIcon} alt="Bot" className="h-11 w-11 object-contain" />,
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

      <div className={`flex items-center max-w-[85%] p-2 rounded-lg ${currentStyle.bg} ${currentStyle.text} ${currentStyle.rounded} shadow-sm`}>
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{text}</p>
        ) : (
          <TypewriterText text={text} />
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 ml-2 self-end">
          {currentStyle.icon}
        </div>
      )}
    </div>
  );
}