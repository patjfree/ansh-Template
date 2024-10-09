'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getDocuments, updateDocument } from '../../../lib/firebase/firebaseUtils';
import SpeechEditor from '../../../components/SpeechEditor';
import VoiceNotesList from '../../../components/VoiceNotesList';

interface Speech {
  id: string;
  title: string;
  content: string;
}

export default function SpeechPage() {
  const { id } = useParams();
  const [speech, setSpeech] = useState<Speech | null>(null);

  useEffect(() => {
    const fetchSpeech = async () => {
      const fetchedSpeeches = await getDocuments('speeches');
      const fetchedSpeech = fetchedSpeeches.find(s => s.id === id) as Speech | undefined;
      setSpeech(fetchedSpeech || null);
    };
    fetchSpeech();
  }, [id]);

  const handleSpeechUpdate = async (updatedContent: string) => {
    if (id && typeof id === 'string' && speech) {
      await updateDocument('speeches', id, {
        content: updatedContent,
        updatedAt: new Date().toISOString(),
      });
      setSpeech({ ...speech, content: updatedContent });
    }
  };

  if (!speech) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{speech.title}</h1>
      <SpeechEditor initialContent={speech.content} onUpdate={handleSpeechUpdate} />
      <VoiceNotesList speechId={id as string} />
    </div>
  );
}