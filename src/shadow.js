export class Shadow {
  constructor(scene, x, y, spriteKey, offsetX = 5, offsetY = -5, alpha = 0.5) {
    this.scene = scene;
    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.sprite = this.scene.add.sprite(
      x + this.offsetX,
      y + this.offsetY,
      spriteKey,
    );
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDisplaySize(64, 64); // Default size, adjust if needed
    this.sprite.setTint(0x000000);
    this.sprite.setAlpha(alpha);
  }

  updatePosition(x, y) {
    this.sprite.setPosition(x + this.offsetX, y + this.offsetY);
  }

  destroy() {
    if (this.sprite) {
      this.sprite.destroy();
    }
  }
}
