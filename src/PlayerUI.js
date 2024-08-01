import { BatteryUI } from "./batteryUI.js";

export class PlayerUI {
  constructor(scene) {
    this.scene = scene;
    this.text = null;
    this.powerText = null;
    this.batteryUI = null; // Add a property to hold the BatteryUI instance
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.power = 100;
  }

  create(player) {
    // Create a text object to display player stats
    this.text = this.scene.add
      .text(
        this.scene.cameras.main.width - 10,
        10,
        `X: ${this.x} Y: ${this.y} Speed: ${this.speed}`,
        { fontSize: "16px", fill: "#fff" },
      )
      .setOrigin(1, 0);

    // Initialize BatteryUI and pass the player instance
    this.batteryUI = new BatteryUI(this.scene);
    this.batteryUI.create(player); // Ensure the player object is passed here
  }

  update(x, y, speed, power) {
    // Update the text with current player stats
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.power = power;

    if (this.text) {
      this.text.setText(
        `X: ${Math.round(this.x)} Y: ${Math.round(this.y)} Speed: ${this.speed}`,
      );
    }

    // Update the BatteryUI if it exists
    if (this.batteryUI) {
      this.batteryUI.update();
    }
  }
}
