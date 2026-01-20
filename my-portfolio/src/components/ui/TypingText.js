"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TypingText({ 
  text, 
  className = "", 
  speed = 80,
  delay = 0,
  showCursor = true,
  onComplete = () => {}
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setIsComplete(true);
          onComplete();
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
        />
      )}
    </span>
  );
}
