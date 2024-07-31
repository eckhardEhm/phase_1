export class DroppodUI {
  constructor(scene) {
    this.scene = scene;
    this.text = null;
    this.distance = 0;
  }

  create() {
    this.text = this.scene.add
      .text(
        this.scene.cameras.main.width - 10,
        50, // Adjust as needed for spacing
        `Droppod Distance: ${Math.round(this.distance)}`,
        { fontSize: "16px", fill: "#fff" },
      )
      .setOrigin(1, 0);
  }

  update(distance) {
    this.distance = distance;
    if (this.text) {
      this.text.setText(`Droppod Distance: ${Math.round(this.distance)}`);
    }
  }
}
