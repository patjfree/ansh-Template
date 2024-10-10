'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../lib/hooks/useAuth';
import SignInWithGoogle from './SignInWithGoogle';
import SpeechEditor from './SpeechEditor';
import SidebarMenu from './SidebarMenu';
import { getDocuments } from '../lib/firebase/firebaseUtils';

interface Speech {
  id: string;
  title: string;
  content: string;
  aiInstructions: string;
}

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [currentSpeech, setCurrentSpeech] = useState<Speech | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchSpeeches = async () => {
        const fetchedSpeeches = await getDocuments('speeches') as Speech[];
        setSpeeches(fetchedSpeeches);
        if (fetchedSpeeches.length > 0) {
          setCurrentSpeech(fetchedSpeeches[0]);
        }
      };
      fetchSpeeches();
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

  const handleSpeechUpdate = (updatedSpeech: Speech) => {
    // Implement speech update logic here
    console.log('Updating speech:', updatedSpeech);
  };

  const handleSaveAs = () => {
    // Implement save as functionality
    console.log('Save As clicked');
  };

  const handleAICleanup = () => {
    // Implement AI cleanup functionality
    console.log('AI Cleanup clicked');
  };

  const handleRecord = () => {
    // Implement record functionality
    console.log('Record clicked');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <button onClick={() => setIsSidebarOpen(true)} className="text-gray-500">
          <MenuIcon />
        </button>
        <h1 className="text-xl font-semibold">{currentSpeech?.title || 'Speech Writer'}</h1>
        <button onClick={() => {/* Implement save functionality */}} className="text-gray-500">
          <SaveIcon />
        </button>
      </header>
      <main className="flex-1 overflow-auto p-4">
        {currentSpeech ? (
          <SpeechEditor speech={currentSpeech} onUpdate={handleSpeechUpdate} />
        ) : (
          <p>Select a speech or create a new one to get started.</p>
        )}
      </main>
      <footer className="bg-white shadow-sm p-4 flex justify-between items-center">
        <button onClick={handleSaveAs} className="flex items-center text-gray-700">
          <CopyIcon className="mr-2" /> Save As
        </button>
        <button onClick={handleAICleanup} className="flex items-center text-gray-700">
          <WandIcon className="mr-2" /> AI Cleanup
        </button>
        <button onClick={handleRecord} className="flex items-center text-gray-700">
          <MicIcon className="mr-2" /> Record
        </button>
      </footer>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}>
          <SidebarMenu 
            speeches={speeches}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onSelectSpeech={(speech: Speech) => {
              setCurrentSpeech(speech);
              setIsSidebarOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const CopyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const WandIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const MicIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);