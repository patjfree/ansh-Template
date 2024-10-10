import React, { useState, useRef } from 'react';
import { useDeepgram } from '@/lib/contexts/DeepgramContext';

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { deepgramApiKey } = useDeepgram();

  const startRecording = async () => {
    // ... (existing start recording logic)
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Open new window with transcribed voice notes
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      window.open(`/voice-notes?audioUrl=${encodeURIComponent(audioUrl)}`, '_blank');
    }
  };

  // ... (rest of the component code)

  return (
    <div>
      {/* ... (existing UI elements) */}
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default VoiceRecorder;