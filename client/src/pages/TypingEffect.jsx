import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const isComplete = currentIndex === text.length;

  useEffect(() => {
    if (isComplete) return;

    const timer = setTimeout(() => {
      setCurrentText((prevText) => prevText + text[currentIndex]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, speed);

    return () => {
      clearTimeout(timer);
    };
  }, [text, speed, currentIndex, isComplete]);

  return <span>{currentText}</span>;
};

export default TypingEffect;
