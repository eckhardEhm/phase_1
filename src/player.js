import { PlayerUI } from "./playerUI.js";
import { handleMovement, wrapAroundScreenEdges } from "./playerMovement.js";

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.sprite = null;
    this.glowFx = null;

    // Configurable variables
    this.speed = 5;
    this.spriteWidth = 64;
    this.spriteHeight = 64;

    // Power property
    this.power = 100; // Initial power level
    this.powerDrainRate = 0.3; // Rate at which power drains per update tick
    this.powerChargeRate = 0.667; // Rate at which power recharges per update tick
    this.droppodRechargeRadius = 32;

    // Create UI instance
    this.ui = new PlayerUI(scene);
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
    this.ui.create();
  }

  createControls() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update(droppod) {
    handleMovement(this);
    wrapAroundScreenEdges(this);
    this.checkDistanceToDroppod(droppod);
    this.updateGlow(droppod);

    // Update UI with current data
    this.ui.update(this.sprite.x, this.sprite.y, this.speed, this.power);
  }

  checkDistanceToDroppod(droppod) {
    if (droppod) {
      const distance = Phaser.Math.Distance.Between(
        this.sprite.x,
        this.sprite.y,
        droppod.sprite.x,
        droppod.sprite.y,
      );
      if (distance > this.droppodRechargeRadius) {
        // Outside the recharge radius: Drain power
        this.power -= this.powerDrainRate;
        this.power = Math.max(this.power, 0); // Ensure power does not go below 0
      } else {
        // Inside the recharge radius: Recharge power
        this.power += this.powerChargeRate;
        this.power = Math.min(this.power, 100); // Ensure power does not exceed 100
      }
    }
  }

  updateGlow() {
    let glowColor = 0xccccff; // Default white color

    if (this.power < 25) {
      glowColor = 0xcc6666; // Red when power is very low
    } else if (this.power > 25 && this.power < 50) {
      glowColor = 0xdddd33; // Yellow when power is below 50%
    } else if (this.power > 50) {
      glowColor = 0xccccff; // default glow
    }
    this.glowFx.color = glowColor;
  }
}
