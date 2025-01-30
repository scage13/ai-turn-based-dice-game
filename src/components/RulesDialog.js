import React, { useState, useEffect } from 'react';
import './RulesDialog.css';

const RulesDialog = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      document.body.style.overflow = 'unset';
    }, 300);
  };

  return (
    <div 
      className={`rules-dialog-overlay ${isClosing ? 'closing' : ''}`} 
      onClick={handleClose}
    >
      <div 
        className={`rules-dialog ${isClosing ? 'closing' : ''}`} 
        onClick={e => e.stopPropagation()}
      >
        <button className="close-button" onClick={handleClose}>×</button>

        <div className="rules-content">
          <section>
            <h3>Game Overview</h3>
            <p>This is a board game where two sides (Good and Evil) compete to reach the end of the path first.</p>
          </section>

          <section>
            <h3>Players & Setup</h3>
            <ul>
              <li>Two sides: Good Side (blue/teal color) and Evil Side (red color)</li>
              <li>Players can choose to play against another player or AI</li>
              <li>The game board consists of different territories (waypoints)</li>
              <li>Each player starts at first location</li>
            </ul>
          </section>

          <section>
            <h3>Movement Rules</h3>
            <div className="rules-table">
              <h4>Critical Results</h4>
              <ul>
                <li><strong>Natural 1:</strong> Critical failure - move back 1 space</li>
                <li><strong>Natural 20:</strong> Critical success - move forward 2 spaces</li>
              </ul>

              <h4>Territory Effects</h4>
              <div className="territory-rules">
                <div className="territory-type">
                  <h5>Common Territory</h5>
                  <ul>
                    <li>Roll 2-9: Miss (stay in place)</li>
                    <li>Roll 10-19: Success (move forward 1 space)</li>
                  </ul>
                </div>

                <div className="territory-type friendly">
                  <h5>Friendly Territory</h5>
                  <ul>
                    <li>Roll 2-7: Miss (stay in place)</li>
                    <li>Roll 8-19: Success (move forward 1 space)</li>
                    <li>Easier to progress through</li>
                  </ul>
                </div>

                <div className="territory-type hostile">
                  <h5>Hostile Territory</h5>
                  <ul>
                    <li>Roll 2-11: Miss (stay in place)</li>
                    <li>Roll 12-19: Success (move forward 1 space)</li>
                    <li>Harder to progress through</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3>Winning & Additional Rules</h3>
            <ul>
              <li>First player to reach the final position wins</li>
              <li>Players take alternating turns</li>
              <li>AI plays as Evil Side with 4-5 second delay between turns</li>
              <li>Game log tracks all moves and results</li>
              <li>Territory information available by clicking locations</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RulesDialog; 