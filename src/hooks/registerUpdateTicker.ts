import type { DisplayObject } from '@pixi/display';
import type { Container, Ticker } from 'pixi.js';

function tickChildrenUpdate(
  object: Container | DisplayObject,
  deltaTime: number,
): void {
  const components = object.getAllComponents();

  for (const component of components) {
    component.update(deltaTime);
  }

  if (!('children' in object)) {
    return;
  }

  for (const child of object.children) {
    tickChildrenUpdate(child, deltaTime);
  }
}

export function registerUpdateTicker(
  ticker: Ticker,
  root: DisplayObject,
): void {
  ticker.add((deltaTime) => {
    tickChildrenUpdate(root, deltaTime);
  });
}
