// src/components/Battery.js

export class Battery {
  constructor(
    gameObject,
    initialPower = 100,
    maxPower = 250,
    maxRechargeRate = 5,
    maxDrainRate = 10,
    powerRange = 25,
    generatePowerRate = 0,
  ) {
    this.OwnerGameObject = gameObject; // Reference to the owning game object
    this.power = initialPower;
    this.maxPower = maxPower;
    this.maxRechargeRate = maxRechargeRate;
    this.maxDrainRate = maxDrainRate;
    this.generatePowerRate = generatePowerRate;
    this.drainRate = 0; // Current drain rate
    this.chargeRate = 0; // Current charge rate
    this.powerRange = powerRange;
  }

  update() {
    this.rechargeSelf(); // Manage recharging and draining
    // Optionally update the battery UI if needed
    if (this.OwnerGameObject && this.OwnerGameObject.batteryUI) {
      this.OwnerGameObject.batteryUI.update(); // Ensure the battery UI is updated
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
