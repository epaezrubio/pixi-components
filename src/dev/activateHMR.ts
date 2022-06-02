import type { Component } from '@/components/Component';

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
