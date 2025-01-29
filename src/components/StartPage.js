import React, { useState } from 'react';
import './StartPage.css';

const StartPage = ({ onStartGame }) => {
  const [gameMode, setGameMode] = useState(null);
  const [selectedSide, setSelectedSide] = useState('good');

  const handleModeSelect = (mode) => {
    setGameMode(mode);
  };

  const handleStartGame = () => {
    const player1 = {
      side: selectedSide,
      name: selectedSide === 'good' ? 'Good Side' : 'Evil Side',
      color: selectedSide === 'good' ? '#ACDFDD' : '#A30000'
    };

    const player2 = {
      side: selectedSide === 'good' ? 'evil' : 'good',
      name: selectedSide === 'good' ? 'Evil Side' : 'Good Side',
      color: selectedSide === 'good' ? '#A30000' : '#ACDFDD'
    };

    onStartGame({
      mode: gameMode,
      player1,
      player2
    });
  };

  return (
    <div className="start-page">
      <h1>Dice Journey Game</h1>
      
      {!gameMode ? (
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
      ) : (
        <div className="side-selection">
          <h2>Choose Your Side</h2>
          <div className="side-select-container">
            <select 
              value={selectedSide} 
              onChange={(e) => setSelectedSide(e.target.value)}
              className="side-select"
            >
              <option value="good">Good Side</option>
              <option value="evil">Evil Side</option>
            </select>
            <div className="side-info">
              <div className="side-preview" style={{ backgroundColor: selectedSide === 'good' ? '#ACDFDD' : '#A30000' }}>
                You will play as {selectedSide === 'good' ? 'Good Side' : 'Evil Side'}
              </div>
              <div className="opponent-preview" style={{ backgroundColor: selectedSide === 'good' ? '#A30000' : '#ACDFDD' }}>
                {gameMode === 'ai' ? 'AI' : 'Player 2'} will play as {selectedSide === 'good' ? 'Evil Side' : 'Good Side'}
              </div>
            </div>
            <button onClick={handleStartGame} className="start-button">
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartPage; 