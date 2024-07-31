// src/player.js
import { PlayerUI } from "./playerUI.js";

export class Player {
  constructor(scene) {
    this.scene = scene;
    this.sprite = null;
    this.shadow = null;

    // Configurable variables
    this.speed = 5;
    this.spriteWidth = 64;
    this.spriteHeight = 64;

    // Shadow properties
    this.shadowOffsetX = 5;
    this.shadowOffsetY = -5;
    this.shadowAlpha = 0.5; // Shadow transparency

    // Power property
    this.power = 100; // Initial power level
    this.powerDrainRate = 0.1; // Rate at which power drains per update tick
    this.powerChargeRate = 0.667; // Rate at which power recharges per update tick
    this.droppodRechargeRadius = 20;

    // Create UI instance
    this.ui = new PlayerUI(scene);
  }

  preload() {
    this.scene.load.image("player", "assets/player.png");
  }

  create(x, y) {
    // Create shadow sprite
    this.shadow = this.scene.add.sprite(
      x + this.shadowOffsetX,
      y + this.shadowOffsetY,
      "player",
    );
    this.shadow.setOrigin(0.5, 0.5);
    this.shadow.setDisplaySize(this.spriteWidth, this.spriteHeight);
    this.shadow.setTint(0x000000);
    this.shadow.setAlpha(this.shadowAlpha);

    // Create player sprite
    this.sprite = this.scene.add.sprite(x, y, "player");
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDepth(1);
    this.sprite.setDisplaySize(this.spriteWidth, this.spriteHeight);

    this.createControls();
    this.ui.create();
  }

  createControls() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  update(droppod) {
    this.handleMovement();
    this.wrapAroundScreenEdges();
    this.checkDistanceToDroppod(droppod);

    // Update UI with current data
    this.ui.update(this.sprite.x, this.sprite.y, this.speed, this.power);
  }

  handleMovement() {
    if (this.cursors.left.isDown) {
      this.sprite.x -= this.speed;
      this.shadow.x -= this.speed;
    } else if (this.cursors.right.isDown) {
      this.sprite.x += this.speed;
      this.shadow.x += this.speed;
    }

    if (this.cursors.up.isDown) {
      this.sprite.y -= this.speed;
      this.shadow.y -= this.speed;
    } else if (this.cursors.down.isDown) {
      this.sprite.y += this.speed;
      this.shadow.y += this.speed;
    }
  }

  wrapAroundScreenEdges() {
    if (this.sprite.x < -this.spriteWidth / 2) {
      this.sprite.x = this.scene.cameras.main.width + this.spriteWidth / 2;
      this.shadow.x = this.sprite.x + this.shadowOffsetX;
    } else if (
      this.sprite.x >
      this.scene.cameras.main.width + this.spriteWidth / 2
    ) {
      this.sprite.x = -this.spriteWidth / 2;
      this.shadow.x = this.sprite.x + this.shadowOffsetX;
    }

    if (this.sprite.y < -this.spriteHeight / 2) {
      this.sprite.y = this.scene.cameras.main.height + this.spriteHeight / 2;
      this.shadow.y = this.sprite.y + this.shadowOffsetY;
    } else if (
      this.sprite.y >
      this.scene.cameras.main.height + this.spriteHeight / 2
    ) {
      this.sprite.y = -this.spriteHeight / 2;
      this.shadow.y = this.sprite.y + this.shadowOffsetY;
    }
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
}
