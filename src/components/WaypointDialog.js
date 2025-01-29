import React, { useState, useEffect } from 'react';
import './WaypointDialog.css';

const WaypointDialog = ({ waypoint, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (waypoint) {
      setIsClosing(false);
      // Prevent body scrolling when dialog is open
      document.body.style.overflow = 'hidden';
    }
    // Cleanup function to restore scrolling when dialog closes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [waypoint]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      document.body.style.overflow = 'unset';
    }, 300);
  };

  if (!waypoint) return null;

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
          <h2>{waypoint.locationName}</h2>
          <div className="location-type">
            {waypoint.locationType.charAt(0).toUpperCase() + waypoint.locationType.slice(1)} Territory
          </div>
        </div>

        <div className="dialog-content">
          <div 
            className="location-image" 
            style={{
              overflow: 'hidden',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}
          >
            <img 
              src={waypoint.background} 
              alt={waypoint.locationName} 
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
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