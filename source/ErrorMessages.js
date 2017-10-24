module.exports = Object.freeze({
    INVALID_COMPONENT: 'Invalid component object. Component should be in the format: `{name: <String>, definition: <Object>`',
    DEPENDENCY_NOT_REGISTERED: 'Dependency has not been registered. Register a dependency with: `registerComponentInstance(component, dependencies = [])`',
    COMPONENT_DOESNT_EXIST: "Component does not exist to deregister"
});