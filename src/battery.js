// src/battery.js
import { Powerable } from "./powerable.js";

export class Battery extends Powerable {
  constructor(capacity, drainRate, maxRechargeRate) {
    super(capacity, drainRate, maxRechargeRate);
  }

  // Additional Battery specific methods if needed in the future
}
