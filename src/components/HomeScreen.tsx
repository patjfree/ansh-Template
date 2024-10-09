'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../lib/hooks/useAuth';
import SignInWithGoogle from './SignInWithGoogle';
import SpeechList from './SpeechList';
import NewSpeechButton from './NewSpeechButton';
import NewVoiceNoteButton from './NewVoiceNoteButton';
import UserProfile from './UserProfile';

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const [speeches, setSpeeches] = useState([]);

  useEffect(() => {
    // Fetch speeches from Firebase when the user is authenticated
    if (user) {
      // Implement fetching speeches from Firebase
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-8">Welcome to Speech Writer</h1>
        <SignInWithGoogle />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <UserProfile user={user} />
      <div className="flex justify-between mb-4">
        <NewSpeechButton />
        <NewVoiceNoteButton />
      </div>
      <SpeechList speeches={speeches} />
    </div>
  );
}