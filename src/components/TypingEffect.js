import React, { useEffect,useState } from 'react';

const TypingEffect = ({message}) => {
  const [text, setText] = useState('');
  
  const speed = 50; // milliseconds per character
  const delay = 2000; // milliseconds

  useEffect(() => {
    let currentIndex = 0;

    // Delay before starting typing effect
    const delayTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        setText((prevText) => prevText + message[currentIndex]);
        currentIndex++;

        if (currentIndex === message.length - 1) {
          clearInterval(typingInterval);
        }
      }, speed);

      // Clear interval on component unmount
      return () => clearInterval(typingInterval);
    }, delay);

    // Clear delay timeout on component unmount
    return () => clearTimeout(delayTimeout);
  }, [message, speed, delay]);

  return (
      <p>{text}</p>
  );
};

export default TypingEffect;
