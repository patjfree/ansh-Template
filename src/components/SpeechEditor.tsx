'use client';

import { useState, useEffect, useRef } from 'react';
import VoiceNotesList from './VoiceNotesList';

interface Speech {
  id: string;
  title: string;
  content: string;
  aiInstructions: string;
}

interface SpeechEditorProps {
  speech: Speech;
  onUpdate: (updatedSpeech: Speech) => void;
}

export default function SpeechEditor({ speech, onUpdate }: SpeechEditorProps) {
  const [activeTab, setActiveTab] = useState('editor');
  const [content, setContent] = useState(speech.content);
  const [aiInstructions, setAiInstructions] = useState(speech.aiInstructions);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      highlightComments();
    }
  }, [content]);

  const highlightComments = () => {
    if (editorRef.current) {
      const highlightedContent = content.replace(/<>.*?<\/>/g, match => `<span style="color: #ff6b6b;">${match}</span>`);
      editorRef.current.innerHTML = highlightedContent.replace(/\n/g, '<br>');
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      let newContent = editorRef.current.innerHTML;
      newContent = newContent.replace(/<br>/g, '\n');
      newContent = newContent.replace(/<[^>]*>/g, '');
      setContent(newContent);
      onUpdate({ ...speech, content: newContent });
    }
  };

  const handleAiInstructionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAiInstructions(e.target.value);
    onUpdate({ ...speech, aiInstructions: e.target.value });
  };

  return (
    <div className="text-black">
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 ${activeTab === 'editor' ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => setActiveTab('editor')}
        >
          Editor
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'voiceNotes' ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => setActiveTab('voiceNotes')}
        >
          Voice Notes
        </button>
      </div>
      {activeTab === 'editor' ? (
        <>
          <div
            ref={editorRef}
            contentEditable
            className="w-full h-64 p-4 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            onInput={handleEditorChange}
            dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
          />
          <textarea
            value={aiInstructions}
            onChange={handleAiInstructionsChange}
            placeholder="Audience information, speech length, speech tone, and additional AI instructions"
            className="w-full p-2 border rounded-md bg-white"
          />
        </>
      ) : (
        <VoiceNotesList speechId={speech.id} />
      )}
    </div>
  );
}