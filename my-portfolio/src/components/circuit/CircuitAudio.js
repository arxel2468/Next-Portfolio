// src/components/circuit/CircuitAudio.js
"use client";
import { useState, useEffect, useRef } from 'react';

export default function CircuitAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorRef = useRef(null);
  const beepIntervalRef = useRef(null);
  
  // Initialize audio on first play
  const initializeAudio = () => {
    try {
      // Create audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) {
        console.warn('Web Audio API not supported');
        return false;
      }
      
      const audioCtx = new AudioContext();
      audioContextRef.current = audioCtx;
      
      // Create oscillator for ambient background
      const oscillator = audioCtx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
      oscillatorRef.current = oscillator;
      
      // Create gain node for volume control
      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNodeRef.current = gainNode;
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      // Start oscillator
      oscillator.start();
      
      return true;
    } catch (error) {
      console.error('Error initializing audio:', error);
      return false;
    }
  };
  
  // Start/stop beep sounds
  const startBeeps = () => {
    if (!audioContextRef.current) return;
    
    beepIntervalRef.current = setInterval(() => {
      try {
        const beep = audioContextRef.current.createOscillator();
        beep.type = 'sine';
        beep.frequency.setValueAtTime(880 + Math.random() * 220, audioContextRef.current.currentTime);
        
        const beepGain = audioContextRef.current.createGain();
        beepGain.gain.setValueAtTime(0.05, audioContextRef.current.currentTime);
        beepGain.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.5);
        
        beep.connect(beepGain);
        beepGain.connect(audioContextRef.current.destination);
        
        beep.start();
        beep.stop(audioContextRef.current.currentTime + 0.5);
      } catch (e) {
        console.error('Error creating beep:', e);
      }
    }, 3000 + Math.random() * 2000);
  };
  
  const stopBeeps = () => {
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
      beepIntervalRef.current = null;
    }
  };
  
  // Handle play/pause
  const toggleAudio = () => {
    if (isPlaying) {
      // Stop audio
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      }
      stopBeeps();
    } else {
      // Start audio
      if (!audioContextRef.current && !initializeAudio()) {
        return; // Failed to initialize
      }
      
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0.05, audioContextRef.current.currentTime);
      }
      startBeeps();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopBeeps();
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    };
  }, []);
  
  return (
    <button
      onClick={toggleAudio}
      className="fixed top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-circuit-surface border border-circuit-primary/30 text-circuit-primary hover:bg-circuit-primary hover:text-circuit-bg transition-colors"
      title={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
    >
      {isPlaying ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
    </button>
  );
}