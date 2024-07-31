import { MainScene } from "./mainScene.js";

// Create the Phaser game configuration
const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: MainScene,
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE, // Make the game resize with the window
    autoCenter: Phaser.Scale.Center.CENTER_BOTH, // Center the game
  },
  parent: "game-container", // Set the container for Phaser's game
};

// Initialize the game
const game = new Phaser.Game(config);

// Handle window resize
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  game.scale.resize(width, height);
});
