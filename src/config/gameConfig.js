export const gameConfig = {
  // Waypoint appearance
  waypoint: {
    size: 26, // radius of hexagon
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
      fontFamily: 'Monospace',
      opacity: 1  // Add opacity setting (0 to 1)
    },
    defaultBackground: 'waypoints/default.webp',
  },

  // Combined waypoint information
  waypoints: [
    {
      id: 0,
      coordinates: { x: 290, y: 200 },
      background: 'waypoints/shire.webp',
      rulesInfo: 'Start your journey here. Roll the dice to move forward.',
      storyInfo: 'The peaceful Shire, where Hobbits dwell and the great journey begins.'
    },
    {
      id: 1,
      coordinates: { x: 340, y: 190 },
      background: 'waypoints/barrow-downs.webp',
      rulesInfo: 'Beware of the Barrow-wights!',
      storyInfo: 'The Barrow-downs, an ancient and dangerous place filled with evil spirits.'
    },
    {
      id: 2,
      coordinates: { x: 385, y: 195 },
      background: 'waypoints/bree-village.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 3',
        description: 'Journey continues...'
      }
    },
    {
      id: 3,
      coordinates: { x: 460, y: 180 },
      background: 'waypoints/trollshaws.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 4',
        description: 'Another milestone...'
      }
    },
    {
      id: 4,
      coordinates: { x: 540, y: 190 },
      background: 'waypoints/rivendell.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 5',
        description: 'The path ahead...'
      }
    },
    {
      id: 5,
      coordinates: { x: 510, y: 280 },
      background: 'waypoints/moria.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 6',
        description: 'Moving forward...'
      }
    },
    {
      id: 6,
      coordinates: { x: 510, y: 374 },
      background: 'waypoints/fangorn.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 7',
        description: 'The journey continues...'
      }
    },
    {
      id: 7,
      coordinates: { x: 440, y: 400 },
      background: 'waypoints/isengard.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 8',
        description: 'Almost there...'
      }
    },
    {
      id: 8,
      coordinates: { x: 480, y: 540 },
      background: 'waypoints/path-of-dead.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 9',
        description: 'The final stretch...'
      }
    },
    {
      id: 9,
      coordinates: { x: 710, y: 480 },
      background: 'waypoints/dead-marshes.webp',
      rulesInfo: {},
      storyInfo: {
        title: 'Waypoint 10',
        description: 'Nearly at the end...'
      }
    },
    {
      id: 10,
      coordinates: { x: 770, y: 660 },
      background: 'waypoints/shelob-lair.webp',
      rulesInfo: 'Reach this point to win the game!',
      storyInfo: 'The final destination of your epic journey.'
    },
    {
      id: 11,
      coordinates: { x: 870, y: 560 },
      background: 'waypoints/mount-doom.webp',
      rulesInfo: 'Reach this point to win the game!',
      storyInfo: 'The final destination of your epic journey.'
    }
  ],

  // Canvas settings
  canvas: {
    width: 1105,
    height: 795,
    backgroundColor: '#ffffff',
    padding: 50,
    background: {
      image: 'background/board-map-bg-cut-version.jpg',
      opacity: 0.8,  // 0 to 1
      scale: 'stretch' // 'cover', 'contain', or 'stretch'
    }
  },

  // Player marker settings
  player: {
    size: 15,           // Reduced size for better fit
    offset: 35,         // Distance above waypoint
    style: {
      strokeColor: '#fff',
      strokeWidth: 2,
      fontSize: 14,     // Reduced font size
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