// Typewriter effect idea from:
// https://bootsnipp.com/snippets/XRNAv
import React, { useEffect, useState } from 'react';

export default function TypewriterText({ text, onComplete }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 30); // guys adjust this if you think it is too slow

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <p className="whitespace-pre-wrap break-words">{displayed}</p>;
}
