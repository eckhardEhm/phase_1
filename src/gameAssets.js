// src/gameSssets.js
export const assets = {
  player: "player.png",
  background: "asteroid_background.webp",
  droppod: "droppod.png",
  mineral_blue_full: "mineral-7soul1_20210112/32x32/rock_mineral_blue_01.png",
};

// Function to preload assets
export function preloadAssets(scene) {
  for (const [key, filename] of Object.entries(assets)) {
    scene.load.image(key, `assets/${filename}`);
  }
}
