import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Dice from './components/Dice';
import PlayerInfo from './components/PlayerInfo';
import StartPage from './components/StartPage';
import { gameConfig } from './config/gameConfig';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [players, setPlayers] = useState([
    { id: 1, name: "Good Side", position: 0, color: '#ACDFDD' },
    { id: 2, name: "Evil Side", position: 0, color: '#A30000' }
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [lastRollResult, setLastRollResult] = useState(null);

  const rollDice = useCallback(() => {
    const newDiceValue = Math.floor(Math.random() * 20) + 1;
    setDiceValue(newDiceValue);
    
    const updatedPlayers = [...players];
    const maxPosition = gameConfig.waypoints.length - 1;
    let positionChange = 0;
    let resultMessage = '';

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
  }, [currentPlayer, players]);

  // AI turn handler
  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 1 && !isGameOver) {
      const aiDelay = Math.random() * 1000 + 1000; // Random delay between 1-2 seconds
      const timeoutId = setTimeout(rollDice, aiDelay);
      return () => clearTimeout(timeoutId);
    }
  }, [gameMode, currentPlayer, isGameOver, rollDice]);

  const resetGame = () => {
    setPlayers(players.map(player => ({
      ...player,
      position: 0
    })));
    setCurrentPlayer(0);
    setDiceValue(null);
    setIsGameOver(false);
    setLastRollResult(null);
  };

  const handleStartGame = (settings) => {
    setGameMode(settings.mode);
    setPlayers([
      { 
        id: 1, 
        name: settings.player1.name, 
        position: 0,
        color: settings.player1.color
      },
      { 
        id: 2, 
        name: settings.mode === 'ai' ? "AI " + settings.player2.name : settings.player2.name, 
        position: 0,
        color: settings.player2.color
      }
    ]);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return <StartPage onStartGame={handleStartGame} />;
  }

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
          disabled={isGameOver || (gameMode === 'ai' && currentPlayer === 1)}
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