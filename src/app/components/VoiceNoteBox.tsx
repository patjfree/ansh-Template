import React from 'react';

interface VoiceNoteBoxProps {
  text: string;
}

const VoiceNoteBox: React.FC<VoiceNoteBoxProps> = ({ text }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <p className="text-gray-800">{text}</p>
    </div>
  );
};

export default VoiceNoteBox;