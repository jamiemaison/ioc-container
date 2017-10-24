const errorMessages = require('./errorMessages');

module.exports = class IOCContainer {
    constructor () {
        this.registeredComponents = {};
    }

    /**
     * Registers a component instance.
     * @param {Object} component - The component to be registered.
     * @param {Object[]} dependencies - The component dependencies.
     */
    registerComponentInstance(component, dependencies = []) {
        if (!component || !component.name || !component.definition) {
            throw new Error(errorMessages.INVALID_COMPONENT);
        };

        this.registeredComponents[component.name] = {
            definition: component.definition, 
            dependencies: dependencies
        };
    }

    /**
     * Deregisters a component instance.
     * @param {String} componentName - The name of the component to be deregistered.
     */
    deregisterComponentInstance(componentName) {
        if (!componentName) {
            throw new Error(errorMessages.INVALID_COMPONENT);
        } else if (!this.registeredComponents.hasOwnProperty(componentName)) {
            throw new Error(errorMessages.COMPONENT_DOESNT_EXIST);
        };

        delete this.registeredComponents[componentName]
    }

    /**
     * Gets a component instance.
     * @param {String} componentName - The name of the component instance.
     * @returns {Object} - The resolved object definition.
     */
    getComponentInstance(componentName) {
        if (this.registeredComponents[componentName].hasOwnProperty("resolvedDefinition")) {
            return this.registeredComponents[componentName].resolvedDefinition
        } else {
            return this._resolveDefinition(componentName)   
        }        
    }


    _resolveDefinition(componentName) {
        var args = [];
        for(var dependency of this.registeredComponents[componentName].dependencies) {
            if(!this.registeredComponents[dependency]) {
                throw new Error(errorMessages.DEPENDENCY_NOT_REGISTERED);
            };
            args.push(new this.registeredComponents[dependency].definition())
        }

        this.registeredComponents[componentName].resolvedDefinition = new this.registeredComponents[componentName].definition(...args);
        return this.registeredComponents[componentName].resolvedDefinition
    }
}