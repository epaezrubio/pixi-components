import type { DisplayObject, Container, Ticker } from 'pixi.js';

/**
 * Recursively iterates all children of the object originally registered as root and calls their update method.
 */
function tickChildrenUpdate(
  object: Container | DisplayObject,
  deltaTime: number,
): void {
  const components = object.getAllComponents();

  for (const component of components) {
    if (!component.enabled) {
      continue;
    }

    component.update(deltaTime);
  }

  if (!('children' in object)) {
    return;
  }

  for (const child of object.children) {
    tickChildrenUpdate(child, deltaTime);
  }
}

/**
 * Creates a binding between the application ticker and the components `update` hook.
 *
 * It registers a recursive loop that traverses all descendant objects of the object passed as `root`.
 *
 * In more advanced cases, this function can be called multiple times with one ticker and different `root` to avoid unnecesary iterations on objects that don't hold components.
 *
 * @param ticker Instance of the ticker that components will use as a `update` callback
 * @param root Root object that transitively holds all descendant components (normally app.ticker or PIXI.Ticker.shared)
 * @returns Callback to unregister this ticker
 */
export function registerUpdateTicker(
  ticker: Ticker,
  root: Container,
): () => void {
  function tickerCallback(deltaTime: number): void {
    tickChildrenUpdate(root, deltaTime);
  }

  ticker.add(tickerCallback);

  return () => {
    ticker.remove(tickerCallback);
  };
}
