import React from 'react';
import './GameLog.css';

const GameLog = ({ logs }) => {
  // Create a copy of logs array and reverse it to show newest first
  const sortedLogs = [...logs].reverse();

  const getTerritoryDescription = (territoryType, territoryName) => {
    const type = territoryType === 'common' ? 'neutral' 
      : territoryType === 'good' ? 'friendly' 
      : 'hostile';
    return `on ${type} territory "${territoryName}"`;
  };

  return (
    <div className="game-log">
      <div className="log-entries">
        {sortedLogs.map((log, index) => {
          // Determine player side from name
          const playerSide = log.player.toLowerCase().includes('evil') ? 'evil' : 'good';
          
          return (
            <div 
              key={index} 
              className={`log-entry ${playerSide}`}
            >
              <div className="log-time">
                {log.timestamp instanceof Date 
                  ? log.timestamp.toLocaleTimeString()
                  : new Date(log.timestamp).toLocaleTimeString()}
              </div>
              <div className="log-content">
                <strong>{log.player}</strong> rolled <span className="dice-value">{log.diceValue}</span>
                <div className="territory-info">
                  {getTerritoryDescription(log.territoryType, log.locationName)}
                </div>
                <div className="result">{log.result}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameLog; 