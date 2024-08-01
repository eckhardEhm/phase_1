import { Player } from "./actors/player.js";
import { Droppod } from "./actors/droppod.js";
import { preloadAssets } from "./gameAssets.js";

// Define the offset range for the droppod
const DROPPOD_OFFSET_RANGE = 200; // Example range for random offset

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
    this.player = null;
    this.droppod = null;
    this.background = null; // To hold the background reference
  }

  preload() {
    preloadAssets(this);
  }

  create() {
    // Create background and set its initial size
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
    this.resize(this.scale.width, this.scale.height); // Initial resize

    // Calculate random offset for droppod
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const offsetX = Phaser.Math.Between(
      -DROPPOD_OFFSET_RANGE,
      DROPPOD_OFFSET_RANGE,
    );
    const offsetY = Phaser.Math.Between(
      -DROPPOD_OFFSET_RANGE,
      DROPPOD_OFFSET_RANGE,
    );

    // Create droppod with random offset
    this.droppod = new Droppod(this, centerX + offsetX, centerY + offsetY);
    this.droppod.preload();
    this.droppod.create();

    // Create player
    this.player = new Player(this);
    this.player.preload();
    this.player.create(centerX, centerY); // Spawn player at the center of the map

    // Handle window resize
    this.scale.on("resize", (gameSize) => {
      this.resize(gameSize.width, gameSize.height);
    });
  }

  update() {
    // Update player and droppod
    if (this.player) {
      this.player.update(this.droppod);
    }
    if (this.droppod) {
      this.droppod.update();
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
