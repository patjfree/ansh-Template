'use client';

import { useState, useEffect } from 'react';
import { getVoiceNotes, VoiceNote } from '../lib/firebase/firebaseUtils';

interface VoiceNotesListProps {
  speechId: string;
}

export default function VoiceNotesList({ speechId }: VoiceNotesListProps) {
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoiceNotes = async () => {
      try {
        const notes = await getVoiceNotes(speechId);
        setVoiceNotes(notes);
      } catch (err) {
        console.error('Error fetching voice notes:', err);
        setError('Failed to load voice notes. Please try again later.');
      }
    };
    fetchVoiceNotes();
  }, [speechId]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="text-black">
      <h2 className="text-xl font-semibold mb-4">Voice Notes</h2>
      {voiceNotes.length === 0 ? (
        <p>No voice notes available for this speech.</p>
      ) : (
        <ul className="space-y-4">
          {voiceNotes.map((note) => (
            <li key={note.id} className="bg-white p-4 rounded-md shadow">
              <p className="text-sm text-gray-500 mb-2">{new Date(note.timestamp).toLocaleString()}</p>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}