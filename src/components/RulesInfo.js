import React from 'react';
import './RulesInfo.css';

const RulesInfo = ({ currentPlayer, players, gameConfig }) => {
  const currentWaypoint = gameConfig.waypoints[players[currentPlayer].position];
  const territoryType = currentWaypoint.locationType;
  const playerSide = players[currentPlayer].side;

  const getRules = () => {
    const baseRules = [
      { roll: '1', effect: 'Critical Failure: Move back 1 space' },
      { roll: '20', effect: 'Critical Success: Move forward 2 spaces' },
    ];

    if (territoryType === 'common') {
      return [
        ...baseRules,
        { roll: '2-9', effect: 'Miss: Stay in place' },
        { roll: '10-19', effect: 'Success: Move forward 1 space' }
      ];
    } else if (territoryType === playerSide) {
      return [
        ...baseRules,
        { roll: '2-7', effect: 'Miss: Stay in place' },
        { roll: '8-19', effect: 'Success: Move forward 1 space' }
      ];
    } else {
      return [
        ...baseRules,
        { roll: '2-11', effect: 'Miss: Stay in place' },
        { roll: '12-19', effect: 'Success: Move forward 1 space' }
      ];
    }
  };

  const getTerrainDescription = () => {
    if (territoryType === 'common') {
      return 'Neutral Territory';
    } else if (territoryType === playerSide) {
      return 'Friendly Territory (Easier to move)';
    } else {
      return 'Hostile Territory (Harder to move)';
    }
  };

  const rules = getRules();

  return (
    <div className="rules-info">
      <h3>Current Location: {currentWaypoint.locationName}</h3>
      <p className="terrain-type">{getTerrainDescription()}</p>
      <div className="rules-table">
        <div className="rules-header">
          <span>Roll</span>
          <span>Effect</span>
        </div>
        {rules.map((rule, index) => (
          <div key={index} className="rule-row">
            <span className="roll">{rule.roll}</span>
            <span className="effect">{rule.effect}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RulesInfo; 