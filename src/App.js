import React, { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Dice from './components/Dice';
import PlayerInfo from './components/PlayerInfo';
import { gameConfig } from './config/gameConfig';

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", position: 0 },
    { id: 2, name: "Player 2", position: 0 }
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastRollResult, setLastRollResult] = useState(null);

  const rollDice = () => {
    const newDiceValue = Math.floor(Math.random() * 20) + 1;
    setDiceValue(newDiceValue);
    
    const updatedPlayers = [...players];
    const maxPosition = gameConfig.waypoints.length - 1;
    let positionChange = 0;
    let resultMessage = '';

    // Determine position change based on dice roll
    if (newDiceValue === 1) {
      positionChange = -1;
      resultMessage = 'Critical failure! Moving back 1 space';
    } else if (newDiceValue >= 2 && newDiceValue <= 9) {
      positionChange = 0;
      resultMessage = 'Miss! Staying in place';
    } else if (newDiceValue >= 10 && newDiceValue <= 19) {
      positionChange = 1;
      resultMessage = 'Success! Moving forward 1 space';
    } else if (newDiceValue === 20) {
      positionChange = 2;
      resultMessage = 'Critical success! Moving forward 2 spaces';
    }

    setLastRollResult(resultMessage);

    // Calculate new position with bounds checking
    const newPosition = Math.max(0, Math.min(
      updatedPlayers[currentPlayer].position + positionChange,
      maxPosition
    ));
    
    updatedPlayers[currentPlayer].position = newPosition;
    setPlayers(updatedPlayers);

    if (newPosition === maxPosition) {
      setIsGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    }
  };

  const resetGame = () => {
    setPlayers([
      { id: 1, name: "Player 1", position: 0 },
      { id: 2, name: "Player 2", position: 0 }
    ]);
    setCurrentPlayer(0);
    setDiceValue(null);
    setIsGameOver(false);
    setLastRollResult(null);
  };

  return (
    <div className="App">
      <GameBoard players={players} />
      <div className="game-controls">
        <PlayerInfo 
          players={players} 
          currentPlayer={currentPlayer}
          isGameOver={isGameOver}
          lastRollResult={lastRollResult}
        />
        <Dice 
          value={diceValue} 
          onRoll={rollDice}
          disabled={isGameOver}
          currentPlayer={currentPlayer}
        />
        {isGameOver && (
          <div className="game-over">
            <h2>{players[currentPlayer].name} Wins!</h2>
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;