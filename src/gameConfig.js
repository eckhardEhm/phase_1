import { MainScene } from "./mainScene.js";

const viewportHeight = window.innerHeight;
const aspectRatio = 1; // Square aspect ratio
const viewportWidth = viewportHeight * aspectRatio;

// Function to calculate font size based on viewport height
function calculateFontSize() {
  // Adjust this multiplier as needed
  const baseFontSize = viewportHeight * 0.05; // 5% of viewport height
  return baseFontSize;
}

export const gameConfig = {
  type: Phaser.AUTO,
  width: viewportWidth,
  height: viewportHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }, // No vertical gravity for top-down
      debug: false,
    },
  },
  scene: MainScene,
  scale: {
    mode: Phaser.Scale.FIT, // Ensure the game scales to fit the viewport
    autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game
  },
  calculateFontSize, // Export the function
};

// Adjust the game size when the window is resized
window.addEventListener("resize", () => {
  gameConfig.width = window.innerHeight * aspectRatio;
  gameConfig.height = window.innerHeight;
});
