'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDeepgram } from '@/lib/contexts/DeepgramContext';
import VoiceNoteBox from '@/app/components/VoiceNoteBox';

const VoiceNotesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const audioUrl = searchParams.get('audioUrl');
  const { deepgramApiKey } = useDeepgram();
  const [transcriptions, setTranscriptions] = useState<string[]>([]);

  useEffect(() => {
    if (audioUrl && deepgramApiKey) {
      transcribeAudio(audioUrl, deepgramApiKey);
    }
  }, [audioUrl, deepgramApiKey]);

  const transcribeAudio = async (url: string, apiKey: string) => {
    try {
      const response = await fetch('/api/deepgram/transcribe-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ audioUrl: url, apiKey }),
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const data = await response.json();
      setTranscriptions(data.transcriptions);
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Voice Notes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transcriptions.map((transcription, index) => (
          <VoiceNoteBox key={index} text={transcription} />
        ))}
      </div>
    </div>
  );
};

export default VoiceNotesPage;