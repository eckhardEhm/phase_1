// src/components/RechargingBattery.js

import { Battery } from "./battery.js";

export class RechargingBattery extends Battery {
    constructor(
      actor,
      initialPower = 100,
      maxPower = 250,
      maxRechargeRate = 5,
      maxDrainRate = 10,
      powerRange = 25,
      generatePowerRate = 0,
    ) {
      super(actor, initialPower, maxPower, maxRechargeRate, maxDrainRate, powerRange, generatePowerRate);
      // Add any additional properties or initialization logic specific to the RechargingBattery class
      this.rechargeRate = 0; // Current recharge rate
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

    // Add any additional methods specific to the RechargingBattery class
    recharge() {
      // Implement the recharge logic here
      this.rechargeRate = Math.min(this.maxRechargeRate, this.generatePowerRate);
      this.power += this.rechargeRate;
      this.power = Math.min(this.power, this.maxPower); // Cap the power to the max capacity
    }
  }