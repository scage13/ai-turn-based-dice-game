import React from 'react';
import './Dice.css';

const Dice = ({ value, onRoll, disabled, currentPlayer, currentPlayerName }) => {
  return (
    <div className="dice-container">
      <div className={`dice ${value ? 'rolled' : ''}`}>
        {value || '?'}
      </div>
      <button 
        onClick={onRoll} 
        disabled={disabled}
        className="roll-button"
      >
        {disabled ? 'Game Over' : `${currentPlayerName}'s Turn`}
      </button>
    </div>
  );
};

export default Dice;