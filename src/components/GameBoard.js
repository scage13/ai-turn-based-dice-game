import React, { useEffect, useRef, useState, useCallback } from 'react';
import './GameBoard.css';
import { gameConfig } from '../config/gameConfig';
import WaypointDialog from './WaypointDialog';

const GameBoard = ({ players, currentPlayer }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef({});  // Store loaded images
  const [selectedWaypoint, setSelectedWaypoint] = useState(null);
  const [hoveredWaypoint, setHoveredWaypoint] = useState(null);
  const waypoints = Array.from({ length: gameConfig.waypoints.length }, (_, i) => i);
  
  // Move getWaypointPosition outside drawCanvas as it's used by multiple functions
  const getWaypointPosition = useCallback((index, totalPoints) => {
    const customPosition = gameConfig.waypoints.find(wp => wp.id === index);
    if (customPosition) {
      return customPosition.coordinates;
    }
    
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
  }, []);

  // Move event handlers outside drawCanvas
  const handleCanvasClick = useCallback((event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    gameConfig.waypoints.forEach(waypoint => {
      const pos = getWaypointPosition(waypoint.id, gameConfig.waypoints.length);
      const distance = Math.sqrt(
        Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2)
      );

      if (distance <= gameConfig.waypoint.size) {
        setSelectedWaypoint(waypoint);
      }
    });
  }, [getWaypointPosition]);

  const handleCanvasMouseMove = useCallback((event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let isOverWaypoint = false;
    gameConfig.waypoints.forEach(waypoint => {
      const pos = getWaypointPosition(waypoint.id, gameConfig.waypoints.length);
      const distance = Math.sqrt(
        Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2)
      );

      if (distance <= gameConfig.waypoint.size) {
        isOverWaypoint = true;
        setHoveredWaypoint(waypoint);
      }
    });

    canvas.style.cursor = isOverWaypoint ? 'pointer' : 'default';
    if (!isOverWaypoint) {
      setHoveredWaypoint(null);
    }
  }, [getWaypointPosition]);

  // Move image loading to a separate effect that runs once
  useEffect(() => {
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
        // Load background image
        if (gameConfig.canvas.background?.image) {
          images.background = await loadImage(gameConfig.canvas.background.image);
        }

        // Load waypoint images
        images.default = await loadImage(gameConfig.waypoint.defaultBackground);
        for (const waypoint of gameConfig.waypoints) {
          if (waypoint.background) {
            images[waypoint.id] = await loadImage(waypoint.background);
          }
        }

        // Load player icons
        images.playerGood = await loadImage('player/good.png');
        images.playerEvil = await loadImage('player/evil.png');

        imagesRef.current = images;
        drawCanvas(); // Initial draw after images are loaded
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []); // Empty dependency array - run once on mount

  // Separate the drawing logic into its own function
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const images = imagesRef.current;

    if (!canvas || !ctx || Object.keys(images).length === 0) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    if (images.background) {
      ctx.save();
      ctx.globalAlpha = gameConfig.canvas.background.opacity ?? 1;
      ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

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
      const iconSize = playerConfig.size * 2;
      const x = pos.x - iconSize / 2;
      const y = pos.y - playerConfig.offset - iconSize / 2;
      
      // Draw player icon based on side
      const icon = player.side === 'good' ? images.playerGood : images.playerEvil;
      ctx.drawImage(icon, x, y, iconSize, iconSize);
    });
  }, [waypoints, players, currentPlayer, getWaypointPosition]);

  // Update canvas when players or current player changes
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Set up canvas size - only needs to happen once
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = gameConfig.canvas.width;
    canvas.height = gameConfig.canvas.height;
  }, []);

  return (
    <div className="game-board">
      <canvas 
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
      />
      <WaypointDialog 
        waypoint={selectedWaypoint}
        onClose={() => setSelectedWaypoint(null)}
      />
    </div>
  );
};

export default GameBoard; 