import _reduce from 'lodash/reduce';

export default function composeComponent(containers, component, displayName) {
  let containersCollection = containers;

  if (!(containersCollection instanceof Array)) {
    containersCollection = [containers];
  }

  const composedComponent = _reduce(containersCollection, (accumulator, container) => (
    container(accumulator)
  ), component);

  composedComponent.displayName = getDisplayName(component, displayName);
  composedComponent.WrappedComponent = component;

  return composedComponent;
}

export function compose(containers, displayName) {
  return function composeDecorator(component) {
    return composeComponent(containers, component, displayName);
  };
}

function getDisplayName(component, displayName) {
  return displayName ||
         component.displayName ||
         component.name ||
         'ComposedComponent';
}
