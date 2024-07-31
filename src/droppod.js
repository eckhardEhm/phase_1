import { DroppodUI } from "./droppodUI.js"; // Import DroppodUI

// Define the offset range for the droppod
const DROPPOD_OFFSET_RANGE = 50; // Example range for random offset

export class Droppod {
  constructor(scene) {
    this.scene = scene;
    this.sprite = null;

    // Configurable variables
    this.spriteWidth = 96;
    this.spriteHeight = 96;

    // Calculate random offset for droppod
    const centerX = this.scene.cameras.main.width / 2;
    const centerY = this.scene.cameras.main.height / 2;
    this.x =
      centerX +
      Phaser.Math.Between(-DROPPOD_OFFSET_RANGE, DROPPOD_OFFSET_RANGE);
    this.y =
      centerY +
      Phaser.Math.Between(-DROPPOD_OFFSET_RANGE, DROPPOD_OFFSET_RANGE);

    // Create UI instance
    this.ui = new DroppodUI(scene);
  }

  preload() {
    this.scene.load.image("droppod", "assets/droppod.png");
  }

  create() {
    this.sprite = this.scene.add.sprite(this.x, this.y, "droppod");
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDepth(1);
    this.sprite.setDisplaySize(this.spriteWidth, this.spriteHeight);

    // Initialize UI
    this.ui.create(); // Create UI elements
  }

  update() {
    // Update UI with current data
    this.ui.update(this.sprite.x, this.sprite.y);
  }
}
