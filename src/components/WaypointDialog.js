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
    setTimeout(onClose, 300);
  };

  if (!waypoint) return null;

  // Capitalize first letter of territory type
  const territoryType = waypoint.locationType.charAt(0).toUpperCase() + waypoint.locationType.slice(1);

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
        
        <div className="dialog-header">
          <div 
            className="location-image" 
            style={{ backgroundImage: `url(${waypoint.background})` }}
          />
        </div>

        <div className="dialog-content">
          <h2>{waypoint.locationName}</h2>
          <div className="location-type">{territoryType} Territory</div>
          <div className="location-description">
            {waypoint.locationDescription.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaypointDialog; 