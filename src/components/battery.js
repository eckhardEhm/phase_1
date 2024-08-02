import { Component } from "./Component.js"; // Ensure the path is correct
import { BatteryUI } from "../ui/BatteryUI.js"; // Correctly import BatteryUI

export class Battery extends Component {
  constructor(
    actor,
    initialPower = 100,
    maxPower = 250,
    maxRechargeRate = 5,
    maxDrainRate = 10,
    powerRange = 25,
    generatePowerRate = 0,
  ) {
    super(actor); // Initialize the base Component class
    this.power = initialPower;
    this.maxPower = maxPower;
    this.maxRechargeRate = maxRechargeRate;
    this.maxDrainRate = maxDrainRate;
    this.generatePowerRate = generatePowerRate;
    this.drainRate = 0; // Current drain rate
    this.chargeRate = 0; // Current charge rate
    this.powerRange = powerRange;

    // Initialize BatteryUI
    this.batteryUI = new BatteryUI(this, actor.sprite);

    console.log("Battery created for " + this.actor.name);
  }

  update() {
    this.rechargeSelf(); // Manage recharging and draining

    // Provide power to nearby Battery components if generatePowerRate is > 0
    if (this.generatePowerRate > 0) {
      this.providePowerToNearbyComponents();
    }

    // Update the battery UI if needed
    if (this.batteryUI) {
      this.batteryUI.update();
    }
  }

  rechargeSelf() {
    // Recharge power
    this.power += this.generatePowerRate;
    this.power = Math.min(this.power, this.maxPower); // Cap the power to the max capacity
  }

  providePowerToNearbyComponents() {
    const nearbyComponents = this.getNearbyComponents();

    nearbyComponents.forEach((component) => {
      if (component !== this) {
        // Avoid providing power to self
        const distance = Phaser.Math.Distance.Between(
          this.actor.sprite.x,
          this.actor.sprite.y,
          component.actor.sprite.x,
          component.actor.sprite.y,
        );

        if (distance <= this.powerRange) {
          // Provide power to nearby battery components
          component.draw(this.generatePowerRate);
        }
      }
    });
  }

  getNearbyComponents() {
    const components = [];
    const actorManager = this.actor.scene.actorManager; // Access the ActorManager instance

    /* //commented because broken

    // Iterate through all actors in the ActorManager
    for (const name in actorManager.actors) {
      const actor = actorManager.actors[name];
      const batteryComponent = actor.getComponent(Battery);
      if (batteryComponent instanceof Battery) {
        components.push(batteryComponent);
      }
    }
 */
    return components;
  }

  draw(rate) {
    this.drainRate = Math.min(rate, this.maxDrainRate); // Cap the drain rate
  }

  charge(rate) {
    this.chargeRate = Math.min(rate, this.maxRechargeRate); // Cap the charge rate
  }
}
