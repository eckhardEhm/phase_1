// src/gameSssets.js
export const assets = {
  player: "player.png",
  background: "asteroid_background.webp",
  droppod: "droppod.png",
};

// Function to preload assets
export function preloadAssets(scene) {
  for (const [key, filename] of Object.entries(assets)) {
    scene.load.image(key, `assets/${filename}`);
  }
}
