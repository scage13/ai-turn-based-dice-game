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
  const [lastRolledPlayer, setLastRolledPlayer] = useState(null);

  const rollDice = useCallback(() => {
    const newDiceValue = Math.floor(Math.random() * 20) + 1;
    setDiceValue(newDiceValue);
    setLastRolledPlayer(currentPlayer);
    
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

    const currentPos = updatedPlayers[currentPlayer].position;
    let newPosition = currentPos + positionChange;
    
    newPosition = Math.max(0, Math.min(newPosition, maxPosition));
    
    updatedPlayers[currentPlayer] = {
      ...updatedPlayers[currentPlayer],
      position: newPosition
    };
    
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
    setLastRolledPlayer(null);
  };

  const handleStartGame = (settings) => {
    setGameMode(settings.mode);
    
    // Create player objects
    const goodPlayer = {
      id: 1,
      name: 'Good Side',
      position: 0,
      color: '#ACDFDD',
      side: 'good'
    };

    const evilPlayer = {
      id: 2,
      name: settings.mode === 'ai' ? 'AI Evil Side' : 'Evil Side',
      position: 0,
      color: '#A30000',
      side: 'evil'
    };

    // Set player order based on chosen side
    if (settings.player1.side === 'good') {
      setPlayers([goodPlayer, evilPlayer]);
    } else {
      setPlayers([evilPlayer, goodPlayer]);
    }

    // Set initial player based on chosen side
    setCurrentPlayer(0); // Player 1 (chosen side) always goes first
    setGameStarted(true);
  };

  if (!gameStarted) {
    return <StartPage onStartGame={handleStartGame} />;
  }

  return (
    <div className="App">
      <GameBoard 
        players={players}
        currentPlayer={currentPlayer}
      />
      <div className="game-controls">
        <PlayerInfo 
          players={players}
          currentPlayer={currentPlayer}
          isGameOver={isGameOver}
          lastRollResult={lastRollResult}
          lastRolledPlayer={lastRolledPlayer}
        />
        <Dice 
          value={diceValue}
          onRoll={rollDice}
          disabled={isGameOver || (gameMode === 'ai' && currentPlayer === 1)}
          currentPlayer={currentPlayer}
          currentPlayerName={players[currentPlayer].name}
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