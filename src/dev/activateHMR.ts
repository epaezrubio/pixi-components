import type { ModuleNamespace } from 'vite/types/hot';

import type { Component } from '../components/Component';

/**
 * Function that enables Vite's hot module replacement of components. It should be called from the derived component constructor.
 *
 * As the Vite documentation recommends, the call to this function should be wrapped in a conditional block so that the code can be tree-shaken. More info about this topic https://vitejs.dev/guide/api-hmr.html
 *
 * @param newModule Compiled module returned by import.meta.hot.accept
 * @param component Reference to the current instance of the component. It will be removed from the related gameObject and normally should be `this`.
 * @param args List of arguments that the component constructor takes.
 */

export function activateHMR(
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  newModule: ModuleNamespace | undefined,
  component: Component,
  ...args: unknown[]
): void {
  const gameObject = component.gameObject;

  if (!gameObject) {
    return;
  }

  if (newModule === undefined) {
    import.meta.hot?.invalidate();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const modules = Object.values(newModule);

  if (modules.length > 1) {
    import.meta.hot?.invalidate();
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newComponent = modules[0];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (newComponent.constructor.length !== component.constructor.length) {
    import.meta.hot?.invalidate();
  }

  gameObject.removeComponent(component);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
  gameObject.addComponent(new newComponent(...args));
}
