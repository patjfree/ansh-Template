'use client';

import { useState, useEffect } from 'react';
import { getDocuments } from '../lib/firebase/firebaseUtils';
import { format } from 'date-fns';

interface VoiceNote {
  id: string;
  text: string;
  timestamp: string;
  duration: number;
}

interface VoiceNotesListProps {
  speechId: string;
}

export default function VoiceNotesList({ speechId }: VoiceNotesListProps) {
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);

  useEffect(() => {
    const fetchVoiceNotes = async () => {
      const fetchedNotes = await getDocuments('voiceNotes');
      setVoiceNotes(fetchedNotes.map(note => ({
        id: note.id,
        text: (note as any).text || '',
        timestamp: (note as any).timestamp || new Date().toISOString(),
        duration: (note as any).duration || 0
      })));
    };
    fetchVoiceNotes();
  }, [speechId]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Voice Notes</h2>
      <div className="space-y-4">
        {voiceNotes.map((note) => (
          <div key={note.id} className="border rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-2">
              {format(new Date(note.timestamp), 'PPP p')} - Duration: {Math.floor(note.duration / 60)}:{(note.duration % 60).toString().padStart(2, '0')}
            </p>
            <p>{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}