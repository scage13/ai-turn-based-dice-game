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
    },
    defaultBackground: 'waypoints/default.webp',
  },

  // Combined waypoint information
  waypoints: [
    {
      id: 0,
      coordinates: { x: 100, y: 100 },
      background: 'waypoints/shire.webp',
      rulesInfo: 'Start your journey here. Roll the dice to move forward.',
      storyInfo: 'The peaceful Shire, where Hobbits dwell and the great journey begins.'
    },
    {
      id: 1,
      coordinates: { x: 200, y: 250 },
      background: 'waypoints/barrow-downs.webp',
      rulesInfo: 'Beware of the Barrow-wights!',
      storyInfo: 'The Barrow-downs, an ancient and dangerous place filled with evil spirits.'
    },
    {
      id: 2,
      coordinates: { x: 300, y: 150 },
      background: 'waypoints/barrow-downs.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 3',
        description: 'Journey continues...'
      }
    },
    {
      id: 3,
      coordinates: { x: 400, y: 250 },
      background: 'waypoints/barrow-downs.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 4',
        description: 'Another milestone...'
      }
    },
    {
      id: 4,
      coordinates: { x: 500, y: 150 },
      background: 'waypoints/barrow-downs.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 5',
        description: 'The path ahead...'
      }
    },
    {
      id: 5,
      coordinates: { x: 600, y: 250 },
      background: 'waypoints/barrow-downs.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 6',
        description: 'Moving forward...'
      }
    },
    {
      id: 6,
      coordinates: { x: 700, y: 150 },
      background: 'waypoints/barrow-downs.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 7',
        description: 'The journey continues...'
      }
    },
    {
      id: 7,
      coordinates: { x: 800, y: 250 },
      background: 'waypoints/barrow-downs.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 8',
        description: 'Almost there...'
      }
    },
    {
      id: 8,
      coordinates: { x: 900, y: 150 },
      background: 'waypoints/barrow-downs.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 9',
        description: 'The final stretch...'
      }
    },
    {
      id: 9,
      coordinates: { x: 800, y: 250 },
      background: 'waypoints/barrow-downs.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 10',
        description: 'Nearly at the end...'
      }
    },
    {
      id: 10,
      coordinates: { x: 900, y: 150 },
      background: 'waypoints/barrow-downs.webp',
      rulesInfo: 'Reach this point to win the game!',
      storyInfo: 'The final destination of your epic journey.'
    }
  ],

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