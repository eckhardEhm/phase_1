import { PlayerUI } from "./ui/playerUI.js";
import { handleMovement, wrapAroundScreenEdges } from "./playerMovement.js";
import { Battery } from "./components/battery.js"; // Ensure you import Battery

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.sprite = null;
    this.glowFx = null;

    // Configurable variables
    this.speed = 5;
    this.spriteWidth = 64;
    this.spriteHeight = 64;

    // Create UI instance
    this.ui = new PlayerUI(scene);

    // Initialize Battery
    this.battery = new Battery(this, 100, 100, 0.667); // Initial power level, max capacity, recharge rate

    // Drain rate and whether player is active
    this.drainRate = 0.3; // Amount of power drained per update
    this.isActive = false; // Track whether player is active
  }

  preload() {
    this.scene.load.image("player", "assets/player.png");
  }

  create(x, y) {
    // Create player sprite
    this.sprite = this.scene.add.sprite(x, y, "player");
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDepth(1);
    this.sprite.setDisplaySize(this.spriteWidth, this.spriteHeight);

    this.glowFx = this.sprite.preFX.addGlow();

    this.createControls();
    this.ui.create(this);
  }

  createControls() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    handleMovement(this);
    wrapAroundScreenEdges(this);

    // Update activity status
    this.isMoving =
      this.cursors.left.isDown ||
      this.cursors.right.isDown ||
      this.cursors.up.isDown ||
      this.cursors.down.isDown;

    // Drain power if active
    if (this.isMoving) {
      this.battery.power -= this.drainRate;
      this.battery.power = Math.max(this.battery.power, 0); // Ensure power does not go below 0
    } else {
      this.battery.power -= this.drainRate / 10;
    }

    this.battery.update(); // Handle power management

    // Update UI with current data
    this.ui.update(
      this.sprite.x,
      this.sprite.y,
      this.speed,
      this.battery.power,
    );
    this.updateGlow();
  }

  updateGlow() {
    let glowColor = 0xccccff; // Default white color

    if (this.battery.power < 25) {
      glowColor = 0xcc6666; // Red when power is very low
    } else if (this.battery.power > 25 && this.battery.power < 50) {
      glowColor = 0xdddd33; // Yellow when power is below 50%
    } else if (this.battery.power > 50) {
      glowColor = 0xccccff; // default glow
    }
    this.glowFx.color = glowColor;
  }
}
