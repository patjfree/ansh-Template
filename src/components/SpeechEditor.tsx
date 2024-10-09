'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '../lib/hooks/useDebounce';

interface SpeechEditorProps {
  initialContent: string;
  onUpdate: (content: string) => void;
}

export default function SpeechEditor({ initialContent, onUpdate }: SpeechEditorProps) {
  const [content, setContent] = useState(initialContent);
  const debouncedContent = useDebounce(content, 500);

  useEffect(() => {
    onUpdate(debouncedContent);
  }, [debouncedContent, onUpdate]);

  const handleBold = () => {
    setContent((prev) => prev + '**Bold Text**');
  };

  const handleItalic = () => {
    setContent((prev) => prev + '*Italic Text*');
  };

  const handleBulletPoint = () => {
    setContent((prev) => prev + '\n- Bullet Point');
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button onClick={handleBold} className="px-2 py-1 bg-gray-200 rounded">B</button>
        <button onClick={handleItalic} className="px-2 py-1 bg-gray-200 rounded">I</button>
        <button onClick={handleBulletPoint} className="px-2 py-1 bg-gray-200 rounded">•</button>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-64 p-4 border rounded-lg resize-none"
        placeholder="Start writing your speech..."
      />
    </div>
  );
}