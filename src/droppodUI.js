import { BatteryUI } from "./batteryUI.js"; // Import the BatteryUI class

export class DroppodUI {
  constructor(scene) {
    this.scene = scene;
    this.batteryUI = null;
    this.droppod = null;
  }

  create(droppod) {
    this.droppod = droppod; // Store reference to the droppod

    // Initialize BatteryUI with the droppod instance
    this.batteryUI = new BatteryUI(this.scene);
    this.batteryUI.create(this.droppod);
  }

  update() {
    if (this.batteryUI) {
      this.batteryUI.update(); // Update the BatteryUI with the current battery power
    }
  }
}
