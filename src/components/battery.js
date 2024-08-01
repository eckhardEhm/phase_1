// src/components/Battery.js

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

    console.log("battery created for " + actor.name);
    //console.log("battery has owner sprite " + actor["sprite"]);
  }

  update() {
    this.rechargeSelf(); // Manage recharging and draining

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

  draw(rate) {
    this.drainRate = Math.min(rate, this.maxDrainRate); // Cap the drain rate
  }

  charge(rate) {
    this.chargeRate = Math.min(rate, this.maxRechargeRate); // Cap the charge rate
  }
}
