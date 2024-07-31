// src/playerUI.js
export class PlayerUI {
  constructor(scene) {
    this.scene = scene;
    this.text = null;
    this.powerBar = null; // Rectangle for power bar
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.power = 100;
  }

  create() {
    // Create a text object to display player stats
    this.text = this.scene.add
      .text(
        this.scene.cameras.main.width - 10,
        10,
        `X: ${this.x} Y: ${this.y} Speed: ${this.speed}`,
        { fontSize: "16px", fill: "#fff" },
      )
      .setOrigin(1, 0);

    // Create the power bar rectangle
    this.powerBar = this.scene.add.graphics();
    this.updatePowerBar(this.power);
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

    if (this.powerBar) {
      this.updatePowerBar(this.power);
    }
  }

  updatePowerBar(power) {
    // Clear previous power bar
    this.powerBar.clear();

    // Calculate the color based on power level
    let color;
    if (power > 40) {
      color = 0x00ff00; // Green
    } else if (power > 10) {
      color = 0xffff00; // Yellow
    } else {
      color = 0xff0000; // Red
    }

    // Draw the power bar
    this.powerBar.fillStyle(color);
    this.powerBar.fillRect(
      this.scene.cameras.main.width - 110, // x position
      10, // y position
      100 * (power / 100), // width based on power level
      20, // height
    );
  }
}
