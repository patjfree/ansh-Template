'use client';

import { useState, useEffect } from 'react';
import { useDeepgram } from '../lib/contexts/DeepgramContext';
import { addDocument } from '../lib/firebase/firebaseUtils';
import { motion } from 'framer-motion';

export default function VoiceRecorder() {
  const [duration, setDuration] = useState(0);
  const { realtimeTranscript } = useDeepgram();

  useEffect(() => {
    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (realtimeTranscript) {
      // Save the transcription to Firebase
      addDocument('voiceNotes', {
        text: realtimeTranscript,
        timestamp: new Date().toISOString(),
        duration,
      });
    }
  }, [realtimeTranscript, duration]);

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-4"
      />
      <p className="text-center text-lg font-semibold mb-2">
        Recording: {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
      </p>
      <p className="text-sm text-gray-600">{realtimeTranscript}</p>
    </div>
  );
}