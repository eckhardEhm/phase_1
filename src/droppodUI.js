export class DroppodUI {
  constructor(scene) {
    this.scene = scene;
    this.text = null;
  }

  create(droppod) {
    // Position the text below the droppod sprite
    this.text = this.scene.add
      .text(
        droppod.sprite.x,
        droppod.sprite.y + droppod.sprite.displayHeight / 2 + 10, // Positioned below the sprite
        `Power: ${droppod.battery.power.toFixed(0)}`, // Display the current power level
        { fontSize: "16px", fill: "#fff" },
      )
      .setOrigin(0.5, 0);
  }

  update() {
    if (this.text) {
      // Update the power display with the current power level
      this.text.setText(
        `Power: ${this.scene.droppod.battery.power.toFixed(0)}`,
      );
    }
  }
}
