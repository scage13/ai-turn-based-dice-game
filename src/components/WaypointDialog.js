import React, { useState, useEffect } from 'react';
import './WaypointDialog.css';

const WaypointDialog = ({ waypoint, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (waypoint) {
      setIsClosing(false);
    }
  }, [waypoint]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Match animation duration
  };

  if (!waypoint) return null;

  const getTypeColor = (type) => {
    switch (type) {
      case 'good': return '#ACDFDD';
      case 'evil': return '#A30000';
      default: return '#8B7355';
    }
  };

  return (
    <div 
      className={`waypoint-dialog-overlay ${isClosing ? 'closing' : ''}`} 
      onClick={handleClose}
    >
      <div 
        className={`waypoint-dialog ${isClosing ? 'closing' : ''}`} 
        onClick={e => e.stopPropagation()}
      >
        <button className="close-button" onClick={handleClose}>×</button>
        
        <div className="dialog-header" style={{ backgroundColor: getTypeColor(waypoint.locationType) }}>
          <div 
            className="location-image" 
            style={{ backgroundImage: `url(${waypoint.background})` }}
          />
          <h2>{waypoint.locationName}</h2>
          <div className="location-type">
            {waypoint.locationType.charAt(0).toUpperCase() + waypoint.locationType.slice(1)} Territory
          </div>
        </div>

        <div className="dialog-content">
          <div className="location-description">
            {waypoint.locationDescription.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaypointDialog; 