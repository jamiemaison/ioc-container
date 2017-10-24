# ioc-container
A simple JavaScript IOC container.

## Setup
To install all required dependencies run `npm install` in the root directory.

## API
### Class: IOCContainer
### registerComponentInstance(component, dependencies) 
Registers a component instance.

**Parameters**
- **component**: `Object` - The component to be registered.  
- **dependencies**: `Object[]` - The component dependencies.


### deregisterComponentInstance(componentName) 
Deregisters a component instance.

**Parameters**
- **componentName**: `String` - The name of the component to be deregistered.

### getComponentInstance(componentName) 
Gets a component instance.

**Parameters**
- **componentName**: `String` - The name of the component instance.

**Returns**
- **instance**: `Object` - The resolved object definition.

## Example
An example using an instance of the IOC container:
~~~~
    container = IOCContainer()
    
    container.registerComponentInstance({name: "ComponentName", definition: componentDefinition}, ["DependencyName"]);
    container.registerComponentInstance({name: "DependencyName", definition: dependencyDefinition});
    
    instance = container.getComponentInstance("ComponentName");
~~~~


## Unit Testing
Unit tests use Mocha (https://mochajs.org/) and can be run by running `npm test` in the project folder. 
