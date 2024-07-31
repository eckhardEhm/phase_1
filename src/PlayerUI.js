// src/playerUI.js
export class PlayerUI {
  constructor(scene) {
    this.scene = scene;
    this.text = null;
    this.powerText = null; // Text for displaying power
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
        `X: ${this.x} Y: ${this.y} Speed: ${this.speed} Power: ${this.power}`,
        { fontSize: "16px", fill: "#fff" },
      )
      .setOrigin(1, 0);

    // Create a text object to display power separately
    this.powerText = this.scene.add
      .text(
        this.scene.cameras.main.width - 10,
        30, // Position below the main stats
        `Power: ${this.power}`,
        { fontSize: "16px", fill: "#fff" },
      )
      .setOrigin(1, 0);
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

    if (this.powerText) {
      this.powerText.setText(`Power: ${Math.round(this.power)}`);
      // Update color based on power level
      if (power > 40) {
        this.powerText.setFill("#0f0"); // Green
      } else if (power > 10) {
        this.powerText.setFill("#ff0"); // Yellow
      } else {
        this.powerText.setFill("#f00"); // Red
      }
    }
  }
}
