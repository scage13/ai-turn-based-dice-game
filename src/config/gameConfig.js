export const gameConfig = {
  // Waypoint appearance
  waypoint: {
    size: 40, // radius of hexagon
    spacing: {
      horizontal: 3.8, // multiplier of size
      vertical: 1.6,   // multiplier of size
    },
    style: {
      strokeColor: '#2c3e50',
      strokeWidth: 3,
      gradient: {
        inner: '#4a90e2',
        outer: '#357abd'
      },
      fontSize: 24,
      fontColor: '#fff',
      fontFamily: 'Monospace'
    }
  },

  // Custom positions for each waypoint
  // If not specified, will use default 2-row layout
  waypoints: [
    { id: 0, x: 100, y: 100 },    
    { id: 1, x: 200, y: 250 },   
    { id: 2, x: 300, y: 150 },   
    { id: 3, x: 400, y: 250 },   
    { id: 4, x: 500, y: 150 },   
    { id: 5, x: 600, y: 250 },   
    { id: 6, x: 700, y: 150 },   
    { id: 7, x: 800, y: 250 },   
    { id: 8, x: 900, y: 150 },   
    { id: 9, x: 800, y: 250 },   
    { id: 10, x: 900, y: 150 },  
  ],

  // Background images for waypoints
  // You can specify different images for different waypoints
  waypointBackgrounds: {
    default: 'waypoints/default.webp',  // Default background
    // Specific backgrounds for waypoints
    0: 'waypoints/shire.webp',
    1: 'waypoints/barrow-downs.webp',
    2: 'waypoints/barrow-downs.webp',
    3: 'waypoints/barrow-downs.webp',
    4: 'waypoints/barrow-downs.webp',
    5: 'waypoints/barrow-downs.webp',
    6: 'waypoints/barrow-downs.webp',
    7: 'waypoints/barrow-downs.webp',
    8: 'waypoints/barrow-downs.webp',
    9: 'waypoints/barrow-downs.webp',
    10: 'waypoints/barrow-downs.webp',
  },

  // Canvas settings
  canvas: {
    width: 1200,
    height: 940,
    backgroundColor: '#ffffff',
    padding: 50,
    background: {
      image: 'background/board-map-bg.jpg',
      opacity: 1,  // 0 to 1
      scale: 'stretch' // 'cover', 'contain', or 'stretch'
    }
  },

  // Player marker settings
  player: {
    size: 20,
    offset: 45,
    style: {
      strokeColor: '#fff',
      strokeWidth: 2,
      fontSize: 18,
      fontFamily: 'Arial',
      fontColor: '#fff'
    }
  },

  // Connection line style
  connectionLine: {
    color: '#666',
    width: 3
  }
}; 