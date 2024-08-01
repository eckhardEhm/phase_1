// src/actors/droppod.js
import { Battery } from "../components/Battery.js"; // Ensure this is the correct path

// Define droppod sprite size
const DROPPOD_WIDTH = 96;
const DROPPOD_HEIGHT = 96;

export class Droppod {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = null;
    this.x = x;
    this.y = y;
    this.name = "DropPod";
  }

  preload() {
    this.scene.load.image("droppod", "assets/droppod.png");
  }

  create() {
    this.sprite = this.scene.add.sprite(this.x, this.y, "droppod");
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDisplaySize(DROPPOD_WIDTH, DROPPOD_HEIGHT); // Set the size
    this.sprite.setDepth(0);
    this.battery = new Battery(this, 50, 1000, 5); // 50 initial power, 1000 max power, 5 max recharge rate
  }

  update() {
    this.battery.update(); // Update the battery power
  }
}
