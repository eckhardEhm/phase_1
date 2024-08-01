export class Component {
  constructor(actor) {
    this.actor = actor; // Reference to the owning actor
  }

  // Update method to be implemented by subclasses
  update() {
    throw new Error("Update method must be implemented by subclasses.");
  }

  // Optional method to initialize the component
  initialize() {
    // Can be overridden by subclasses for initialization logic
  }

  // Optional method to cleanup resources or states when the component is removed
  cleanup() {
    // Can be overridden by subclasses for cleanup logic
  }
}
