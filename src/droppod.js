import { DroppodUI } from "./ui/droppodUI.js";
import { Battery } from "./components/battery.js"; // Ensure this is the correct path

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

    // Initialize the battery with initial power, max capacity, and max recharge rate
    this.battery = new Battery(this, 50, 1000, 5); // 50 initial power, 1000 max power, 5 max recharge rate
    // Assuming you have a mechanism to set a charging source if needed
    // this.battery.setChargingSource(someSource);
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
    this.battery.update(); // Update the battery power
    this.ui.update(this.battery.power); // Update the DroppodUI with the current battery power
  }
}
