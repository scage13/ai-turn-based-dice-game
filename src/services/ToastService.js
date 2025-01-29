import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getPlayerStyle = (playerSide) => {
  return {
    background: playerSide === 'good' ? 'linear-gradient(to right, #ACDFDD, #7FB3B1)' : 'linear-gradient(to right, #A30000, #800000)',
    color: playerSide === 'good' ? '#2c3e50' : '#ffffff',
  };
};

export const showTurnResult = (player, diceValue, territoryType, resultMessage) => {
  const territoryDesc = territoryType === 'common' ? 'neutral territory' 
    : territoryType === player.side ? 'friendly territory' 
    : 'hostile territory';

  const message = `
    ${player.name} rolled ${diceValue}
    on ${territoryDesc}!
    ${resultMessage}
  `;

  toast(message, {
    style: getPlayerStyle(player.side),
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  // Return log entry for history
  return {
    timestamp: new Date(),
    player: player.name,
    playerSide: player.side,
    diceValue,
    territoryType,
    result: resultMessage,
  };
}; 