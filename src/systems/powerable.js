export class Powerable {
  constructor(capacity, drainRate, maxRechargeRate) {
    this.capacity = capacity; // Maximum power capacity
    this.power = capacity; // Current power level
    this.drainRate = drainRate; // Rate at which power drains when active
    this.maxRechargeRate = maxRechargeRate; // Maximum recharge rate
    this.isPoweredOn = false; // Status of the object
  }

  // Method to turn the object on
  PowerOn() {
    this.isPoweredOn = true;
  }

  // Method to turn the object off
  PowerOff() {
    this.isPoweredOn = false;
  }

  // Update power level based on whether the object is powered on
  updatePower() {
    if (this.isPoweredOn) {
      this.power -= this.drainRate;
      this.power = Math.max(this.power, 0); // Ensure power does not go below 0
    } else {
      this.power = Math.min(this.power + this.maxRechargeRate, this.capacity); // Recharge power
    }
  }
}
