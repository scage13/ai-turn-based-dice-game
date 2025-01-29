import React from 'react';
import './StartPage.css';

const StartPage = ({ onStartGame }) => {
  const handleModeSelect = (mode) => {
    onStartGame({
      mode: mode, // 'local' or 'ai'
    });
  };

  return (
    <div className="start-page">
      <h1>Dice Journey Game</h1>
      <div className="mode-selection">
        <h2>Select Game Mode</h2>
        <div className="mode-buttons">
          <button onClick={() => handleModeSelect('local')}>
            Play with Friend
            <span className="mode-description">Play locally on the same device</span>
          </button>
          <button onClick={() => handleModeSelect('ai')}>
            Play with AI
            <span className="mode-description">Play against computer opponent</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartPage; 