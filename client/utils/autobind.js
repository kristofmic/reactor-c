/* eslint no-param-reassign: 0 */

export default function autobindMethods(functionKeys, thisArg) {
  if (!(functionKeys instanceof Array)) { return; }
  if (!thisArg) { return; }

  functionKeys.forEach((key) => {
    if (typeof thisArg[key] !== 'function') {
      nonFunctionPropertyWarning(key, thisArg.constructor.name);
    } else {
      thisArg[key] = thisArg[key].bind(thisArg);
    }
  });
}

export function autobind(target, name, desc) {
  const method = desc.value;
  let isBinding = false;

  if (typeof method !== 'function') {
    nonFunctionPropertyWarning(name, target.constructor.name);
    return desc;
  }

  return {
    configurable: true,
    get() {
      if (isBinding) {
        return method;
      }

      isBinding = true;

      Object.defineProperty(this, name, {
        configurable: true,
        writable: true,
        value: method.bind(this)
      });

      isBinding = false;

      return this[name];
    }
  };
}

function nonFunctionPropertyWarning(methodName, componentName) {
  console.warn(`Trying to bind non-function property ${methodName} to React component ${componentName}`);
}
