import React, { useEffect, useState } from 'react';

// Typewriter effect inspired by: https://bootsnipp.com/snippets/XRNAv
export default function TypewriterText({ text, onComplete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setIndex(index + 1);
      }, 30);

      return () => clearTimeout(timeout);
    } else {
      if (onComplete) onComplete();
    }
  }, [index, text, onComplete]);

  return (
    <p className="whitespace-pre-wrap break-words">
      {text.slice(0, index)}
    </p>
  );
}
