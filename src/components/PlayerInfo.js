import React from 'react';
import './PlayerInfo.css';

const PlayerInfo = ({ players, currentPlayer, isGameOver, lastRollResult, lastRolledPlayer }) => {
  // Sort players to always show human player first in the UI
  const sortedPlayers = [...players].sort((a, b) => {
    // If it's AI player, keep original order
    if (a.name.includes('AI') || b.name.includes('AI')) {
      return 0;
    }
    // Otherwise, show player's chosen side first
    return a === players[0] ? -1 : 1;
  });

  return (
    <div className="player-info">
      {sortedPlayers.map((player, index) => {
        const isCurrentPlayer = player === players[currentPlayer];
        const showRollResult = lastRolledPlayer !== null && 
                             player === players[lastRolledPlayer] && 
                             lastRollResult && 
                             !isGameOver;
        
        return (
          <div 
            key={player.id} 
            className={`player-status ${isCurrentPlayer && !isGameOver ? 'active' : ''}`}
            style={{ 
              borderColor: player.color,
              backgroundColor: isCurrentPlayer ? `${player.color}15` : 'white'
            }}
          >
            <h3 style={{ color: player.color }}>
              {player.name}
              {isCurrentPlayer && " (Your Turn)"}
            </h3>
            <p>Position: {player.position}</p>
            {showRollResult && (
              <p className="roll-result">{lastRollResult}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlayerInfo;