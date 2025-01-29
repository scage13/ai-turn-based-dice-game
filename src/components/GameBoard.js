import React, { useEffect, useRef } from 'react';
import './GameBoard.css';
import { gameConfig } from '../config/gameConfig';

const GameBoard = ({ players, currentPlayer }) => {
  const canvasRef = useRef(null);
  const waypoints = Array.from({ length: gameConfig.waypoints.length }, (_, i) => i);
  
  // Calculate waypoint positions
  const getWaypointPosition = (index, totalPoints) => {
    // Check if custom position exists in config
    const customPosition = gameConfig.waypoints.find(wp => wp.id === index);
    if (customPosition) {
      return customPosition.coordinates;
    }
    
    // Fallback to default layout if no custom position found
    const { size } = gameConfig.waypoint;
    const { horizontal, vertical } = gameConfig.waypoint.spacing;
    const horizontalSpacing = size * horizontal;
    const verticalSpacing = size * vertical;
    
    const row = index % 2;
    const column = Math.floor(index / 2);
    
    return {
      x: column * horizontalSpacing + (row * horizontalSpacing / 2) + size,
      y: row * verticalSpacing + size + 50
    };
  };

  const drawHexagon = (ctx, x, y, size) => {
    const numberOfSides = 6;
    const angle = (2 * Math.PI) / numberOfSides;
    
    ctx.beginPath();
    for (let i = 0; i < numberOfSides; i++) {
      const xPoint = x + size * Math.cos(angle * i - Math.PI / 6);
      const yPoint = y + size * Math.sin(angle * i - Math.PI / 6);
      if (i === 0) {
        ctx.moveTo(xPoint, yPoint);
      } else {
        ctx.lineTo(xPoint, yPoint);
      }
    }
    ctx.closePath();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size from config
    canvas.width = gameConfig.canvas.width;
    canvas.height = gameConfig.canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const loadImages = async () => {
      const images = {};
      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };

      try {
        // Load background image if configured
        let backgroundImage = null;
        if (gameConfig.canvas.background?.image) {
          backgroundImage = await loadImage(gameConfig.canvas.background.image);
        }

        // Load waypoint images
        images.default = await loadImage(gameConfig.waypoint.defaultBackground);
        for (const waypoint of gameConfig.waypoints) {
          if (waypoint.background) {
            images[waypoint.id] = await loadImage(waypoint.background);
          }
        }

        // Load player icons
        const playerIcons = {
          good: await loadImage('player/good.png'),
          evil: await loadImage('player/evil.png')
        };

        // Draw background image if exists
        if (backgroundImage) {
          ctx.save();
          
          // Set background opacity
          ctx.globalAlpha = gameConfig.canvas.background.opacity ?? 1;
          
          // Calculate background drawing parameters based on scale setting
          let dx = 0, dy = 0, dWidth = canvas.width, dHeight = canvas.height;
          
          if (gameConfig.canvas.background.scale === 'cover') {
            const scale = Math.max(
              canvas.width / backgroundImage.width,
              canvas.height / backgroundImage.height
            );
            dWidth = backgroundImage.width * scale;
            dHeight = backgroundImage.height * scale;
            dx = (canvas.width - dWidth) / 2;
            dy = (canvas.height - dHeight) / 2;
          } else if (gameConfig.canvas.background.scale === 'contain') {
            const scale = Math.min(
              canvas.width / backgroundImage.width,
              canvas.height / backgroundImage.height
            );
            dWidth = backgroundImage.width * scale;
            dHeight = backgroundImage.height * scale;
            dx = (canvas.width - dWidth) / 2;
            dy = (canvas.height - dHeight) / 2;
          }
          
          ctx.drawImage(backgroundImage, dx, dy, dWidth, dHeight);
          ctx.restore();
        }

        // Start drawing with transformation
        ctx.save();
        
        // Draw connecting lines
        ctx.beginPath();
        waypoints.forEach((waypoint, index) => {
          const pos = getWaypointPosition(waypoint, waypoints.length);
          if (index === 0) {
            ctx.moveTo(pos.x, pos.y);
          } else {
            ctx.lineTo(pos.x, pos.y);
          }
        });
        const { connectionLine } = gameConfig;
        ctx.strokeStyle = connectionLine.color;
        ctx.lineWidth = connectionLine.width;
        ctx.stroke();

        // Draw waypoints
        waypoints.forEach((waypointIndex) => {
          const pos = getWaypointPosition(waypointIndex, waypoints.length);
          const { size, style } = gameConfig.waypoint;
          const waypoint = gameConfig.waypoints.find(wp => wp.id === waypointIndex);
          
          // Check if this waypoint is active (has current player)
          const activePlayer = players.find(p => p.position === waypointIndex && players.indexOf(p) === currentPlayer);
          
          drawHexagon(ctx, pos.x, pos.y, size);
          
          // Set waypoint opacity
          ctx.save();
          ctx.globalAlpha = style.opacity ?? 1;
          
          // Draw background image or gradient
          const backgroundImage = waypoint?.background ? images[waypointIndex] : images.default;
          if (backgroundImage) {
            ctx.clip();
            ctx.drawImage(
              backgroundImage,
              pos.x - size,
              pos.y - size,
              size * 2,
              size * 2
            );
          } else {
            const gradient = ctx.createRadialGradient(
              pos.x, pos.y, 0,
              pos.x, pos.y, size
            );
            gradient.addColorStop(0, style.gradient.inner);
            gradient.addColorStop(1, style.gradient.outer);
            ctx.fillStyle = gradient;
            ctx.fill();
          }

          // Reset opacity for stroke and text
          ctx.restore();

          // Draw border with active player color if this is current waypoint
          ctx.strokeStyle = activePlayer ? activePlayer.color : style.strokeColor;
          ctx.lineWidth = style.strokeWidth;
          ctx.stroke();
        });

        // Draw players after waypoints
        players.forEach((player) => {
          const pos = getWaypointPosition(player.position, waypoints.length);
          const { player: playerConfig } = gameConfig;
          
          // Calculate icon position (centered above waypoint)
          console.log(player, playerConfig);
          const iconSize = playerConfig.size * 2; // Adjust size as needed
          const x = pos.x - iconSize / 2;
          const y = pos.y - playerConfig.offset - iconSize / 2;
          
          // Draw player icon
          const icon = playerIcons[player.side];
          ctx.drawImage(icon, x, y, iconSize, iconSize);
        });

        // Restore the canvas context transformation
        ctx.restore();
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, [players, waypoints, currentPlayer]);

  return (
    <div className="game-board">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default GameBoard; 