export class Actor {
  constructor() {
    this.components = [];
  }

  // Add a component to the actor
  addComponent(component) {
    if (component && typeof component.update === "function") {
      this.components.push(component);
    } else {
      console.error("Invalid component: Must have an update method.");
    }
  }

  // Remove a component from the actor
  removeComponent(component) {
    const index = this.components.indexOf(component);
    if (index !== -1) {
      this.components.splice(index, 1);
    } else {
      console.error("Component not found.");
    }
  }

  // Update all registered components
  update() {
    this.components.forEach((component) => component.update());
  }

  // Get all components of a specific type
  getComponentsOfType(type) {
    return this.components.filter((component) => component instanceof type);
  }

  // Clear all components
  clearComponents() {
    this.components = [];
  }

  // Check if the actor has a specific component
  hasComponent(component) {
    return this.components.includes(component);
  }
}
