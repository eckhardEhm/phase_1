import { gameConfig } from "./gameConfig.js";
import { preloadAssets } from "./gameAssets.js";
import {
  createPlayer,
  updatePlayerMovement,
  wrapPlayer,
  getPlayerSpeed,
} from "./player.js";

const config = {
  ...gameConfig,
  scene: {
    preload: preload,
    create: create,
    update: update,
    resetPlayer: resetPlayer,
  },
};

let player;
let cursors;
let text;

function preload() {
  preloadAssets(this); // Use the preload function from gameAssets.js
}

function create() {
  // Set a black background
  this.cameras.main.setBackgroundColor("#000000");

  // Add background image
  this.add.image(
    this.cameras.main.width / 2,
    this.cameras.main.height / 2,
    "background",
  );

  // Create player sprite
  player = createPlayer(this);

  // Set world bounds
  this.physics.world.setBounds(
    0,
    0,
    this.cameras.main.width,
    this.cameras.main.height,
  );

  // Create text object
  text = this.add.text(
    16,
    16,
    `Use arrow keys to move. Speed: ${getPlayerSpeed()}`,
    {
      fontSize: "32px",
      fill: "#fff",
    },
  );

  // Set up controls
  cursors = this.input.keyboard.createCursorKeys();

  // Add stars or other objects
  this.physics.add.sprite(
    Phaser.Math.Between(100, this.cameras.main.width - 100),
    Phaser.Math.Between(100, this.cameras.main.height - 100),
    "star",
  );

  // Initialize player speed
  this.playerSpeed = 160; // Default speed

  // Listen for custom events
  window.addEventListener("game:restart", () => {
    resetGame(this);
  });

  window.addEventListener("game:speedChange", (event) => {
    const change = event.detail;
    if (typeof change === "number") {
      let newSpeed = Math.max(0, this.playerSpeed + change);
      this.playerSpeed = newSpeed;
      text.setText(
        `Player X: ${Math.round(player.x)} Y: ${Math.round(player.y)} Speed: ${newSpeed}`,
      );
    }
  });
}

function update() {
  // Update player movement
  updatePlayerMovement(player, cursors, this.playerSpeed);

  // Wrap player around the map
  wrapPlayer(player, this.cameras.main.width, this.cameras.main.height);

  // Update text
  text.setText(
    `Player X: ${Math.round(player.x)} Y: ${Math.round(player.y)} Speed: ${getPlayerSpeed()}`,
  );
}

function resetPlayer() {
  player.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
}

function resetGame(scene) {
  scene.resetPlayer();
  scene.playerSpeed = 160; // Reset speed to default value
  text.setText(
    `Player X: ${Math.round(player.x)} Y: ${Math.round(player.y)} Speed: ${scene.playerSpeed}`,
  );
}

// Export the resetPlayer function and config
export { resetPlayer, config };
