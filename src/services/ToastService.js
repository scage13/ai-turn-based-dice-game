import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getPlayerStyle = (playerSide) => {
  return {
    background: playerSide === 'good' ? 'linear-gradient(to right, #ACDFDD, #7FB3B1)' : 'linear-gradient(to right, #A30000, #800000)',
    color: playerSide === 'good' ? '#2c3e50' : '#ffffff',
    borderRadius: '4px',
    padding: '12px 20px',
    fontSize: '14px',
    fontFamily: 'Oldenburg, cursive'
  };
};

export const showTurnResult = (player, diceValue, territoryType, resultMessage, locationName) => {
  const territoryDesc = territoryType === 'common' ? 'neutral territory' 
    : territoryType === player.side ? 'friendly territory' 
    : 'hostile territory';

  const message = `${player.name} rolled ${diceValue} on ${territoryDesc} "${locationName}"!\n${resultMessage}`;

  const logEntry = {
    player: player.name,
    diceValue,
    territoryType,
    locationName,
    result: resultMessage,
    timestamp: new Date()
  };

  toast(message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: getPlayerStyle(player.side),
    theme: player.side === 'good' ? 'light' : 'dark',
  });

  return logEntry;
}; 