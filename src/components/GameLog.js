import React from 'react';
import './GameLog.css';

const GameLog = ({ logs }) => {
  return (
    <div className="game-log">
      <h3>Game History</h3>
      <div className="log-entries">
        {logs.map((log, index) => (
          <div 
            key={index} 
            className={`log-entry ${log.playerSide}`}
          >
            <div className="log-time">
              {log.timestamp.toLocaleTimeString()}
            </div>
            <div className="log-content">
              <strong>{log.player}</strong> rolled <span className="dice-value">{log.diceValue}</span>
              <div className="territory-info">
                on {log.territoryType === 'common' ? 'neutral' : log.territoryType} territory
              </div>
              <div className="result">{log.result}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameLog; 