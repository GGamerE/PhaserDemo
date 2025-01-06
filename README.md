# Phaser Game Demo

A simple 2D platformer game built with Phaser.js featuring tilemap-based level design, physics interactions, and collectible gameplay.

## Features

- **Tilemap-based Level Design**: Built using Tiled JSON format with custom tilesets
- **Physics-enabled Gameplay**: Gravity, collisions, and object interactions
- **Interactive Elements**:
  - Red player character (pushable boxes)
  - Collectible golden stars
  - Dangerous bombs that appear after collecting all stars
  - Pushable brown boxes for puzzle solving
- **Score System**: Earn points by collecting stars

## Game Controls

- **Arrow Keys**: Move left/right and jump
- **Left/Right**: Walk and push boxes
- **Up**: Jump (when touching ground)

## Game Objects

- 🟥 **Red Square**: Player character
- 🟫 **Brown Boxes**: Pushable objects for puzzle solving  
- ⭐ **Golden Stars**: Collectibles that increase score
- ⚫ **Black Bombs**: Hazards that end the game
- 🟩 **Green Tiles**: Platforms and ground

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Game

### Development Mode
```bash
npm run dev
```
This will start a local server at `http://localhost:3000` and automatically open the game in your browser.

### Production Mode
```bash
npm start
```
This starts the server without auto-opening the browser.

## Project Structure

```
phaserdemo/
├── assets/
│   ├── tilemap.json      # Tiled JSON tilemap data
│   ├── tileset.json      # Tileset configuration
│   └── tileset.png       # Tileset image
├── game.js               # Main game logic
├── index.html            # Game container
└── package.json          # Dependencies and scripts
```

## Game Mechanics

### Physics System
- Gravity affects all dynamic objects
- Collision detection between player, boxes, platforms, and collectibles
- Bouncing effects for enhanced gameplay feel

### Level Design
- 25x15 tile grid (800x480 pixels)
- Multiple platform levels for vertical gameplay
- Strategic box placement for puzzle elements

### Scoring
- +10 points per star collected
- All stars must be collected to spawn bombs
- Game over when player touches a bomb

## Technical Details

- **Engine**: Phaser.js 3.90.0
- **Physics**: Arcade Physics system
- **Rendering**: WebGL with Canvas fallback
- **Assets**: SVG-based sprites for crisp graphics
- **Map Format**: Tiled JSON with custom properties

## Browser Compatibility

Compatible with all modern browsers supporting:
- ES6+ JavaScript
- WebGL or Canvas 2D
- Local file serving capabilities

## License

ISC License