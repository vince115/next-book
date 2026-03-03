"use client";

import { useEffect, useState } from "react";
import { Volume2, Square } from "lucide-react";

interface Props {
  contentSelector?: string; // CSS selector for content
}

export function SpeakButton({ contentSelector = "article" }: Props) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);
    }
    
    // Cleanup on unmount
    return () => {
      if (typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSpeak = () => {
    if (!supported) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const element = document.querySelector(contentSelector);
    if (!element) {
      console.warn("Content element not found:", contentSelector);
      return;
    }

    const text = (element as HTMLElement).innerText;
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Simple heuristic: if contains chinese characters, use zh-TW
    const hasChinese = /[\u4e00-\u9fa5]/.test(text);
    utterance.lang = hasChinese ? "zh-TW" : "en-US";
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  if (!supported) return null;

  return (
    <button
      onClick={handleSpeak}
      className={`
        p-2 rounded-md transition-colors mr-2
        ${isSpeaking 
          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
          : 'hover:bg-gray-100 text-gray-600 dark:hover:bg-gray-800 dark:text-gray-300'
        }
      `}
      aria-label={isSpeaking ? "Stop Speaking" : "Read Aloud"}
      title={isSpeaking ? "Stop Speaking" : "Read Aloud"}
    >
      {isSpeaking ? <Square size={20} fill="currentColor" /> : <Volume2 size={20} />}
    </button>
  );
}
