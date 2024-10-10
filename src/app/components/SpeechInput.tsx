import React from 'react';

const SpeechInput: React.FC = () => {
  return (
    <textarea
      className="w-full p-2 border rounded-md"
      style={{ color: 'black', backgroundColor: 'white' }}
      placeholder="Enter your speech here..."
    />
  );
};

export default SpeechInput;