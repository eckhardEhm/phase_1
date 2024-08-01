// src/ui/DroppodUI
import { BatteryUI } from "./batteryUI.js";

export class DroppodUI {
  constructor(scene) {
    this.scene = scene;
    this.text = null;
    this.droppod = null;
    this.batteryUI = null; // Add a property to hold the BatteryUI instance
  }

  create(droppod) {
    if (!droppod || !droppod.sprite) {
      console.error("Invalid droppod or droppod does not have a sprite.");
      return;
    }

    this.droppod = droppod; // Store reference to the droppod
    const offsetY = 20; // Adjust as needed

    // Create text object for the battery power display below the droppod
    this.text = this.scene.add
      .text(
        this.droppod.sprite.x, // Align text with droppod sprite x position
        this.droppod.sprite.y + this.droppod.sprite.displayHeight / 2 + offsetY, // Position below the droppod sprite
        `Power: ${Math.round(this.droppod.battery.power)}`, // Display the power level
        { fontSize: "16px", fill: "#fff" },
      )
      .setOrigin(0.5, 0); // Center text horizontally

    // Initialize BatteryUI and pass the droppod instance
    this.batteryUI = new BatteryUI(this.scene);
    this.batteryUI.create(droppod); // Ensure the droppod object is passed here
  }

  update() {
    if (this.droppod && this.text) {
      // Update the text to show the current battery power
      this.text.setText(`Power: ${Math.round(this.droppod.battery.power)}`);

      // Update the BatteryUI if it exists
      if (this.batteryUI) {
        this.batteryUI.update();
      }
    }
  }
}
