export class BatteryUI {
  constructor(OwnerBattery, ActorSprite) {
    this.actorSprite = ActorSprite;
    this.text = null;
    this.Battery = null; // Store reference to the battery

    this.Battery = OwnerBattery; // Store reference to the battery
    const offsetY = 20; // Adjust as needed

    if (this.actorSprite == null) return;
    // Create text object for the battery power display below the battery's sprite
    this.text = this.actorSprite.scene.add
      .text(
        this.actorSprite.x, // Align text with battery's sprite x position
        this.actorSprite.y + this.actorSprite.displayHeight / 2 + offsetY, // Position below the battery's sprite
        `Power: ${Math.round(this.Battery.power)}`, // Display the power level
        { fontSize: "16px", fill: "#fff" },
      )
      .setOrigin(0.5, 0); // Center text horizontally
  }

  update() {
    if (this.Battery && this.text) {
      // Update the text to show the current battery power
      this.text.setText(`Power: ${Math.round(this.Battery.power)}`);

      // Update the position of the text to follow the battery's sprite
      this.text.setPosition(
        this.actorSprite.x,
        this.actorSprite.y + this.actorSprite.displayHeight / 2 + 20,
      );
    }
  }
}
