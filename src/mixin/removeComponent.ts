import type { DisplayObject } from 'pixi.js';

import type { Component } from '../components/Component';
import { componentsMap } from '../mixin/componentsMap';

export function removeComponent(
  this: DisplayObject,
  component: Component,
): void {
  if (!componentsMap.has(this)) {
    componentsMap.set(this, []);
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const gameObjectComponents = componentsMap.get(this)!;
  const componentIndex = gameObjectComponents.indexOf(component);

  if (componentIndex !== -1) {
    gameObjectComponents.splice(componentIndex, 1);
  }

  component.setGameObject(undefined);
}
