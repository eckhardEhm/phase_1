export class Battery {
  constructor(initialPower, maxPower, rechargeRate, generatePowerRate = 0) {
    this.power = initialPower;
    this.maxPower = maxPower;
    this.rechargeRate = rechargeRate;
    this.generatePowerRate = generatePowerRate;
    this.isCharging = true;
  }

  update() {
    if (this.isCharging) {
      // Recharge or generate power
      this.power += this.generatePowerRate || this.rechargeRate;
      this.power = Math.min(this.power, this.maxPower); // Cap the power to the max capacity
    }
    this.power = Math.max(this.power, 0); // Ensure power does not go below 0
  }

  startCharging() {
    this.isCharging = true;
  }

  stopCharging() {
    this.isCharging = false;
  }
}
