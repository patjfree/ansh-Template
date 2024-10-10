import { useState } from 'react';

interface Speech {
  id: string;
  title: string;
  content: string;
  aiInstructions: string;
}

interface SidebarMenuProps {
  speeches: Speech[];
  isOpen: boolean;
  onClose: () => void;
  onSelectSpeech: (speech: Speech) => void;
}

export default function SidebarMenu({ speeches, isOpen, onClose, onSelectSpeech }: SidebarMenuProps) {
  const [newSpeechTitle, setNewSpeechTitle] = useState('');

  const handleNewSpeech = () => {
    // Implement new speech creation
  };

  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">My Speeches</h2>
        <button onClick={onClose} className="text-gray-500">
          <CloseIcon />
        </button>
      </div>
      <ul className="py-4">
        {speeches.map((speech) => (
          <li key={speech.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => onSelectSpeech(speech)}>
            <div className="flex items-center justify-between">
              <span>{speech.title}</span>
              <div>
                <button className="text-gray-500 mr-2"><DownloadIcon /></button>
                <button className="text-gray-500"><TrashIcon /></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <input
          type="text"
          placeholder="New speech title"
          value={newSpeechTitle}
          onChange={(e) => setNewSpeechTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button onClick={handleNewSpeech} className="w-full bg-black text-white py-2 rounded">
          + New Speech
        </button>
      </div>
    </div>
  );
}

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);