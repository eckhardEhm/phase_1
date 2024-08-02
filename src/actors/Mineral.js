// src/actors/Mineral.js

import { assets } from '../gameAssets.js';
import { Actor } from './Actor.js';

class Mineral extends Actor {
  constructor(scene, x, y, health=100, type) {
    super();
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.health = health;
    this.type = type;
  }

  preload() {}

  create(x, y) {
    const spriteKey = `mineral_${this.type}_full`;
    this.sprite = this.scene.add.sprite(x, y, spriteKey);
  }
}

export { Mineral };
