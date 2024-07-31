// src/gameAssets.js
export const assets = {
  player: "player.png",
  background: "asteroid_background.webp", // Updated background image
  droppod: "droppod.png",
};

// Function to preload assets
export function preloadAssets(scene) {
  for (const [key, filename] of Object.entries(assets)) {
    scene.load.image(key, `assets/${filename}`);
  }
}
