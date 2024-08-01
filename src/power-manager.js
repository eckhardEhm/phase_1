// src/power-manager.js
export class PowerManager {
  constructor(
    initialPower = 100,
    drainRate = 0.3,
    chargeRate = 0.667,
    maxPower = 100,
  ) {
    this.power = initialPower;
    this.drainRate = drainRate;
    this.chargeRate = chargeRate;
    this.maxPower = maxPower;
  }

  drain(amount) {
    this.power -= amount;
    this.power = Math.max(this.power, 0); // Ensure power does not go below 0
  }

  charge(amount) {
    this.power += amount;
    this.power = Math.min(this.power, this.maxPower); // Ensure power does not exceed maxPower
  }

  getPower() {
    return this.power;
  }
}
