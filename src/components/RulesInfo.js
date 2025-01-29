import React from 'react';
import './RulesInfo.css';

const RulesInfo = ({ currentPlayer, players, gameConfig }) => {
  const currentWaypoint = gameConfig.waypoints[players[currentPlayer].position];
  const territoryType = currentWaypoint.locationType;
  const isHostile = territoryType !== players[currentPlayer].side && territoryType !== 'common';

  return (
    <div className="rules-info">
      <div className="location-header">
        <h2>Current Location: {currentWaypoint.locationName}</h2>
        <div 
          className="location-image"
          style={{ 
            backgroundImage: `url(${currentWaypoint.background})`,
            width: '100%',
            height: '200px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
            marginBottom: '1rem'
          }}
        />
      </div>

      <div className={`territory-type ${isHostile ? 'hostile' : ''}`}>
        {isHostile ? 'Hostile Territory (Harder to move)' : 
          territoryType === 'common' ? 'Neutral Territory' : 
          'Friendly Territory (Easier to move)'}
      </div>

      <div className="rules-table">
        <div className="table-header">
          <span>Roll</span>
          <span>Effect</span>
        </div>

        <div className="table-row">
          <span>1</span>
          <span>Critical Failure:<br/>Move back 1 space</span>
        </div>

        <div className="table-row">
          <span>20</span>
          <span>Critical Success:<br/>Move forward 2 spaces</span>
        </div>

        <div className="table-row">
          <span>{isHostile ? '2-11' : territoryType === 'common' ? '2-9' : '2-7'}</span>
          <span>Miss: Stay in place</span>
        </div>

        <div className="table-row">
          <span>{isHostile ? '12-19' : territoryType === 'common' ? '10-19' : '8-19'}</span>
          <span>Success: Move forward 1 space</span>
        </div>
      </div>
    </div>
  );
};

export default RulesInfo; 