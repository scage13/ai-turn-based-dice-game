import React from 'react';
import './PlayerInfo.css';

const PlayerInfo = ({ players, currentPlayer, isGameOver }) => {
  return (
    <div className="player-info">
      {players.map((player, index) => (
        <div 
          key={player.id} 
          className={`player-status ${index === currentPlayer && !isGameOver ? 'active' : ''}`}
        >
          <h3>{player.name}</h3>
          <p>Position: {player.position}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayerInfo;