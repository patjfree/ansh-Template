'use client';

import { useState } from 'react';
import { useDeepgram } from '../lib/contexts/DeepgramContext';
import VoiceRecorder from './VoiceRecorder';

export default function NewVoiceNoteButton() {
  const [isRecording, setIsRecording] = useState(false);
  const { connectToDeepgram, disconnectFromDeepgram } = useDeepgram();

  const handleStartRecording = async () => {
    await connectToDeepgram();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    disconnectFromDeepgram();
    setIsRecording(false);
  };

  return (
    <>
      <button
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        className={`${
          isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        } text-white font-bold py-2 px-4 rounded`}
      >
        {isRecording ? 'Stop Recording' : 'New Voice Note'}
      </button>
      {isRecording && <VoiceRecorder />}
    </>
  );
}