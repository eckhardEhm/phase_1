// src/fx/Glow
export class Glow {
  constructor(scene, x, y, spriteKey, glowColor, alpha = 0.5) {
    this.scene = scene;
    this.sprite = this.scene.add.sprite(x, y, spriteKey);
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDisplaySize(96, 96); // Default size, adjust if needed
    this.sprite.setTint(glowColor);
    this.sprite.setAlpha(alpha);
    this.sprite.setDepth(0); // Ensure glow is rendered behind the player
    this.isVisible = false;
  }

  updatePosition(x, y) {
    this.sprite.setPosition(x, y);
  }

  show() {
    this.sprite.setAlpha(0.5);
    this.isVisible = true;
  }

  hide() {
    this.sprite.setAlpha(0);
    this.isVisible = false;
  }

  destroy() {
    if (this.sprite) {
      this.sprite.destroy();
    }
  }
}
