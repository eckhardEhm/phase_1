import { MainScene } from "./mainScene.js";

// Add this to your game.js file
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    // Pause the game when visibility is hidden
    game.paused = true;
  } else {
    // Resume the game when visibility is visible again
    game.paused = false;
  }
  console.log("pause ? : "+game.paused)
});

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
  backgroundColor: "#2d2d2d",
  fx: {
    glow: {
      distance: 32,
      quality: 0.1,
    },
  },
};

// Initialize the game
const game = new Phaser.Game(config);

// Handle window resize
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  game.scale.resize(width, height);
});

// Expose the game instance to the console
window.game = game;
