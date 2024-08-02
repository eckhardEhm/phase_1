// src/mainScene.js

import { Player } from "./actors/player.js";
import { Droppod } from "./actors/droppod.js";
import { preloadAssets } from "./gameAssets.js";
import { ActorManager } from "./actors/ActorManager.js"; // Import the ActorManager
import { Mineral } from './actors/Mineral.js';

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
    this.background = null; // To hold the background reference
    this.actorManager = null; // To hold the ActorManager instance
  }

  preload() {
    preloadAssets(this);
  }

  createBackground() {
    // Create background and set its initial size
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
  }

  createDropPod() {

    // Create and add droppod actor
    const droppod = new Droppod(this);
    droppod.preload();
    droppod.create();
    this.actorManager.addActor(droppod);
  }

  createPlayer() {
    // Create and add player actor
    const player = new Player(this);
    player.preload();
    let centerX = this.cameras.main.width / 2;
    let centerY = this.cameras.main.height / 2;
    player.create(centerX, centerY); // Spawn player at the center of the map
    this.actorManager.addActor(player);
  }

  create() {
    // Initialize the ActorManager
    this.actorManager = new ActorManager(this);

    this.createBackground();
    this.createDropPod();
    this.createPlayer();

    const mineral = new Mineral(this.scene.scene, 50, 50, 10, 'blue');
    mineral.create(mineral.x,mineral.y);

    // Handle window resize
    this.scale.on("resize", (gameSize) => {
      this.resize(gameSize.width, gameSize.height);
    });
    this.resize(this.scale.width, this.scale.height); // Initial resize
  }

  update() {
    // Update all actors through the ActorManager
    if (this.actorManager) {
      this.actorManager.update();
    }
  }

  resize(width, height) {
    // Adjust the background to scale with the height, but not necessarily fill the width
    if (this.background) {
      this.background.setDisplaySize(
        width * (this.background.height / height),
        height,
      );
      this.background.setPosition(
        (width - this.background.displayWidth) / 2,
        0,
      );
    }
    this.cameras.main.setSize(width, height);
    this.cameras.main.centerOn(width / 2, height / 2);
  }
}
