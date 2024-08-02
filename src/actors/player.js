// src/actors/player.js
import { handleMovement, wrapAroundScreenEdges } from "../playerMovement.js";
import { Battery } from "../components/battery.js";
import { Actor } from "./Actor.js";

export class Player extends Actor{
  constructor(scene) {
    super();
    this.scene = scene;
    this.sprite = null;
    this.glowFx = null;
    this.name = "Player";

    // Player Specific Properties
    this.speed = 5;
    this.spriteWidth = 64;
    this.spriteHeight = 64;
    this.drainRate = 0.3; // Amount of power drained per update
    this.isActive = false; // Track whether player is active
  }

  preload() {
    this.scene.load.image("player", "assets/player.png");
  }

  create(x, y) {
    this.sprite = this.scene.add.sprite(x, y, "player");
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDepth(1);
    this.sprite.setDisplaySize(this.spriteWidth, this.spriteHeight);

    this.glowFx = this.sprite.preFX.addGlow();

    this.createControls();
    this.battery = new Battery(this, 100, 100, 0.667);
  }

  createControls() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update() {
    handleMovement(this);
    wrapAroundScreenEdges(this);

    this.isMoving =
      this.cursors.left.isDown ||
      this.cursors.right.isDown ||
      this.cursors.up.isDown ||
      this.cursors.down.isDown;

    if (this.isMoving) {
      this.battery.power -= this.drainRate;
      this.battery.power = Math.max(this.battery.power, 0); // Ensure power does not go below 0
    } else {
      this.battery.power -= this.drainRate / 10;
    }

    this.battery.update();

    this.updateGlow();
  }

  updateGlow() {
    let glowColor = 0xccccff;

    if (this.battery.power < 25) {
      glowColor = 0xcc6666; // Red glow for low power
    } else if (this.battery.power > 25 && this.battery.power < 50) {
      glowColor = 0xdddd33; // Yellow color when power below 50%
    } else if (this.battery.power > 50) {
      glowColor = 0xccccff; // default whitish color
    }
    this.glowFx.color = glowColor;
  }
}
