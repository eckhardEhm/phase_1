import { DroppodUI } from "./droppodUI.js";
import { Battery } from "./battery.js"; // Assuming this is where the Battery class is located

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

    // Initialize the battery with a capacity of 1000
    this.battery = new Battery(1000);
  }

  preload() {
    this.scene.load.image("droppod", "assets/droppod.png");
  }

  create() {
    this.sprite = this.scene.add.sprite(this.x, this.y, "droppod");
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDisplaySize(DROPPOD_WIDTH, DROPPOD_HEIGHT); // Set the size
    this.sprite.setDepth(0);

    // Pass the droppod instance to DroppodUI
    this.ui.create(this);
  }

  update() {
    // Update the DroppodUI with the current battery power
    this.ui.update(this);
  }
}
