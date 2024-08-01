export class BatteryUI {
  constructor(scene) {
    this.scene = scene;
    this.text = null;
    this.object = null; // Store reference to the object with the battery
  }

  create(object) {
    if (!object || !object.sprite) {
      console.error("Invalid object or object does not have a sprite.");
      return;
    }

    this.object = object; // Store reference to the object
    const offsetY = 20; // Adjust as needed

    // Create text object for the battery power display below the object
    this.text = this.scene.add
      .text(
        this.object.sprite.x, // Align text with object's sprite x position
        this.object.sprite.y + this.object.sprite.displayHeight / 2 + offsetY, // Position below the object's sprite
        `Power: ${Math.round(this.object.battery.power)}`, // Display the power level
        { fontSize: "16px", fill: "#fff" },
      )
      .setOrigin(0.5, 0); // Center text horizontally
  }

  update() {
    if (this.object && this.text) {
      // Update the text to show the current battery power
      this.text.setText(`Power: ${Math.round(this.object.battery.power)}`);
    }
  }
}
