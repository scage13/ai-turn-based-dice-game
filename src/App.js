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

  const rollDice = () => {
    const newDiceValue = Math.floor(Math.random() * 20) + 1;
    setDiceValue(newDiceValue);
    
    const updatedPlayers = [...players];
    const maxPosition = gameConfig.waypoints.length - 1;
    const newPosition = Math.min(updatedPlayers[currentPlayer].position + newDiceValue, maxPosition);
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
  };

  return (
    <div className="App">
      <GameBoard players={players} />
      <div className="game-controls">
        <PlayerInfo 
          players={players} 
          currentPlayer={currentPlayer}
          isGameOver={isGameOver} 
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