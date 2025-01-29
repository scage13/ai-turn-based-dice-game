import React, { useState, useEffect } from 'react';
import './Toolbar.css';
import GameLog from './GameLog';

const Toolbar = ({ 
  onNewGame, 
  onRoll, 
  disabled = false, 
  currentPlayerName = '',
  diceValue = null,
  logs = [],
  isGameOver = false,
  currentPlayer // Add this prop to get current player info
}) => {
  const [showLogs, setShowLogs] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  // Handle dice animation
  useEffect(() => {
    if (diceValue) {
      setIsRolling(true);
      const timer = setTimeout(() => {
        setIsRolling(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [diceValue]);

  // Get player-specific styles
  const getPlayerStyle = () => {
    const isEvil = currentPlayer?.side === 'evil';
    return {
      background: isEvil ? '#A30000' : '#ACDFDD',
      color: isEvil ? '#ffffff' : '#2c3e50',
      borderColor: isEvil ? '#800000' : '#7FB3B1'
    };
  };

  // Handle roll click with animation
  const handleRollClick = () => {
    setIsRolling(true);
    onRoll();
  };

  return (
    <>
      <div className="toolbar">
        <div className="toolbar-left">
          <button className="toolbar-button" onClick={onNewGame}>
            <span className="button-icon">🏠</span>
            New Game
          </button>
          {logs.length > 0 && (
            <button 
              className="toolbar-button log-button"
              onClick={() => setShowLogs(true)}
            >
              <span className="button-icon">📜</span>
              Game Log
            </button>
          )}
        </div>
        
        <div className="toolbar-right">
          <div className="dice-section">
            <div className={`dice ${isRolling ? 'rolled' : ''}`}>
              {diceValue || '?'}
            </div>
            <button 
              onClick={handleRollClick} 
              disabled={disabled}
              className={`roll-button ${currentPlayer?.side || ''}`}
              style={getPlayerStyle()}
            >
              <img 
                src={`player/${currentPlayer?.side || 'good'}.png`}
                alt=""
                className="player-icon"
              />
              {isGameOver ? 'Game Over' : `${currentPlayerName}'s Turn`}
            </button>
          </div>
        </div>
      </div>

      {/* Game Log Dialog */}
      {showLogs && (
        <div className="log-dialog-overlay" onClick={() => setShowLogs(false)}>
          <div className="log-dialog" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowLogs(false)}>×</button>
            <h2>Game Log</h2>
            <div className="log-content">
              <GameLog logs={logs} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Toolbar.defaultProps = {
  disabled: false,
  currentPlayerName: '',
  diceValue: null,
  logs: [],
  isGameOver: false
};

export default Toolbar; 