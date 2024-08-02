// src/actors/droppod.js
import { Battery } from "../components/Battery.js"; // Ensure this is the correct path
import { Actor } from "./Actor.js"; // Import the Actor class


// Define droppod sprite size
const DROPPOD_WIDTH = 96;
const DROPPOD_HEIGHT = 96;

export class Droppod extends Actor {
  constructor(scene, x, y) {
    super(); // Call the constructor of the Actor class
    this.scene = scene;
    this.sprite = null;
    this.x = x;
    this.y = y;
    this.name = "DropPod";
  }

  preload() {
    this.scene.load.image("droppod", "assets/droppod.png");
  }

  create() {
    this.sprite = this.scene.add.sprite(this.x, this.y, "droppod");
    this.sprite.setOrigin(0.5, 0.5);
    this.sprite.setDisplaySize(DROPPOD_WIDTH, DROPPOD_HEIGHT); // Set the size
    this.sprite.setDepth(0);
    this.battery = new Battery(this, 50, 1000, 5, 10, 25, 1);
    /*
actor,
initialPower = 100,
maxPower = 250,
maxRechargeRate = 5,
maxDrainRate = 10,
powerRange = 25,
generatePowerRate = 0,*/
  }

  update() {
    this.battery.update(); // Update the battery power
  }
}
