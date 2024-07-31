export class DroppodUI {
  constructor(scene) {
    this.scene = scene;
    this.text = null;
    this.x = 0;
    this.y = 0;
  }

  create() {
    // Create a text object to display droppod stats
    this.text = this.scene.add
      .text(
        this.scene.cameras.main.width - 10,
        50, // Adjust as needed for spacing
        `Droppod X: ${this.x} Y: ${this.y}`,
        { fontSize: "16px", fill: "#fff" },
      )
      .setOrigin(1, 0);
  }

  update(x, y) {
    // Update the text with current droppod stats
    this.x = x;
    this.y = y;
    if (this.text) {
      this.text.setText(
        `Droppod X: ${Math.round(this.x)} Y: ${Math.round(this.y)}`,
      );
    }
  }
}
