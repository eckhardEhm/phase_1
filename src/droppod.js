import { DroppodUI } from "./droppodUI.js";

// Define droppod sprite size
const DROPPOD_WIDTH = 96;
const DROPPOD_HEIGHT = 96;

export class Droppod {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = null;
    this.x = x;
    this.y = y;
    this.ui = new DroppodUI(scene);
  }

  preload() {
    this.scene.load.image("droppod", "assets/droppod.png");
  }

  create() {
    this.sprite = this.scene.add.sprite(this.x, this.y, "droppod");
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDisplaySize(DROPPOD_WIDTH, DROPPOD_HEIGHT); // Set the size
    this.sprite.setDepth(0);
    this.ui.create();
  }

  update() {
    if (this.scene.player) {
      // Calculate the distance between the droppod and the player
      const distance = Phaser.Math.Distance.Between(
        this.sprite.x,
        this.sprite.y,
        this.scene.player.sprite.x,
        this.scene.player.sprite.y,
      );
      // Update the UI with the current distance
      this.ui.update(distance);
    }
  }
}
