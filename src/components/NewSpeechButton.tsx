'use client';

import { useRouter } from 'next/navigation';
import { addDocument } from '../lib/firebase/firebaseUtils';

export default function NewSpeechButton() {
  const router = useRouter();

  const handleNewSpeech = async () => {
    try {
      const newSpeech = await addDocument('speeches', {
        title: 'Untitled Speech',
        content: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      router.push(`/speech/${newSpeech.id}`);
    } catch (error) {
      console.error('Error creating new speech:', error);
    }
  };

  return (
    <button
      onClick={handleNewSpeech}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      New Speech
    </button>
  );
}