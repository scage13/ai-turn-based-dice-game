import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import StartPage from './components/StartPage';
import { gameConfig } from './config/gameConfig';
import RulesInfo from './components/RulesInfo';
import { ToastContainer } from 'react-toastify';
import { showTurnResult } from './services/ToastService';
import Toolbar from './components/Toolbar';
import 'react-toastify/dist/ReactToastify.css';

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
  const [gameLogs, setGameLogs] = useState([]);

  const rollDice = useCallback(() => {
    const newDiceValue = Math.floor(Math.random() * 20) + 1;
    setDiceValue(newDiceValue);
    
    const updatedPlayers = [...players];
    const maxPosition = gameConfig.waypoints.length - 1;
    let positionChange = 0;
    let resultMessage = '';

    // Get current waypoint type
    const currentWaypoint = gameConfig.waypoints[updatedPlayers[currentPlayer].position];
    const territoryType = currentWaypoint.locationType;
    const playerSide = updatedPlayers[currentPlayer].side;

    // Critical failure (always the same)
    if (newDiceValue === 1) {
      positionChange = -1;
      resultMessage = 'Critical failure! Moving back 1 space';
    }
    // Critical success (always the same)
    else if (newDiceValue === 20) {
      positionChange = 2;
      resultMessage = 'Critical success! Moving forward 2 spaces';
    }
    // Territory-based rules
    else {
      if (territoryType === 'common') {
        // Standard rules for common territory
        if (newDiceValue >= 2 && newDiceValue <= 9) {
          positionChange = 0;
          resultMessage = 'Miss! Staying in place';
        } else if (newDiceValue >= 10 && newDiceValue <= 19) {
          positionChange = 1;
          resultMessage = 'Success! Moving forward 1 space';
        }
      }
      else if (territoryType === playerSide) {
        // Favorable territory (easier to move)
        if (newDiceValue >= 2 && newDiceValue <= 7) {
          positionChange = 0;
          resultMessage = 'Miss on friendly territory! Staying in place';
        } else if (newDiceValue >= 8 && newDiceValue <= 19) {
          positionChange = 1;
          resultMessage = 'Success on friendly territory! Moving forward 1 space';
        }
      }
      else {
        // Hostile territory (harder to move)
        if (newDiceValue >= 2 && newDiceValue <= 11) {
          positionChange = 0;
          resultMessage = 'Miss on hostile territory! Staying in place';
        } else if (newDiceValue >= 12 && newDiceValue <= 19) {
          positionChange = 1;
          resultMessage = 'Success despite hostile territory! Moving forward 1 space';
        }
      }
    }

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

    // Create log entry and show toast
    const logEntry = showTurnResult(
      updatedPlayers[currentPlayer],
      newDiceValue,
      territoryType,
      resultMessage
    );
    
    setGameLogs(prev => [...prev, logEntry]);
  }, [currentPlayer, players]);

  // AI turn handler
  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 1 && !isGameOver) {
      // Wait for first toast to finish (3000ms) plus a random delay between 1-2 seconds
      const aiDelay = 3000 + Math.random() * 1000 + 1000; // Total delay: 4-5 seconds
      const timeoutId = setTimeout(rollDice, aiDelay);
      return () => clearTimeout(timeoutId);
    }
  }, [gameMode, currentPlayer, isGameOver, rollDice]);

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

  const handleNewGame = () => {
    setGameStarted(false);
    setPlayers([
      { id: 1, name: "Good Side", position: 0, color: '#ACDFDD' },
      { id: 2, name: "Evil Side", position: 0, color: '#A30000' }
    ]);
    setCurrentPlayer(0);
    setDiceValue(null);
    setIsGameOver(false);
    setGameLogs([]);
  };

  if (!gameStarted) {
    return <StartPage onStartGame={handleStartGame} />;
  }

  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={1}
        style={{ bottom: '20px' }}
      />
      <Toolbar 
        onNewGame={handleNewGame}
        onRoll={rollDice}
        disabled={isGameOver || (gameMode === 'ai' && currentPlayer === 1)}
        currentPlayerName={players[currentPlayer].name}
        diceValue={diceValue}
        logs={gameLogs}
        isGameOver={isGameOver}
      />
      <div className="game-layout">
        <GameBoard players={players} currentPlayer={currentPlayer} />
        <div className="game-sidebar">
          <RulesInfo 
            currentPlayer={currentPlayer}
            players={players}
            gameConfig={gameConfig}
          />
        </div>
      </div>
    </div>
  );
}

export default App;