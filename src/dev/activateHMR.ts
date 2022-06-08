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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newModule: Record<string, any>,
  component: Component,
  ...args: unknown[]
): void {
  const gameObject = component.gameObject;

  if (!gameObject) {
    return;
  }

  const modules = Object.values(newModule);

  if (modules.length > 1) {
    import.meta.hot?.invalidate();
  }

  /* eslint-disable */
  const NewComponent = modules[0];

  if (NewComponent.constructor.length !== component.constructor.length) {
    import.meta.hot?.invalidate();
  }

  gameObject.removeComponent(component);
  gameObject.addComponent(new NewComponent(...args));
  /* eslint-enable */
}
