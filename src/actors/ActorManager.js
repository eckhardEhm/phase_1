// src/ActorManager.js

export class ActorManager {
  constructor(scene) {
    this.scene = scene; // The Phaser scene that this manager is part of
    this.actors = {}; // Store actors by name for easy access
  }

  // Add an actor to the manager
  addActor(actor) {
    if (actor.name) {
      this.actors[actor.name] = actor;
    } else {
      console.error("Actor must have a name.");
    }
  }

  // Remove an actor from the manager
  removeActor(actor) {
    if (actor.name in this.actors) {
      delete this.actors[actor.name];
    } else {
      console.error("Actor not found.");
    }
  }

  // Get an actor by name
  getActor(name) {
    return this.actors[name] || null;
  }

  // Update all actors
  update() {
    for (const name in this.actors) {
      const actor = this.actors[name];
      if (actor.update) {
        actor.update();
      }
    }
  }

  // Clear all actors
  clear() {
    this.actors = {};
  }
}
