import type { DisplayObject } from 'pixi.js';

import type { Component } from '../components/Component';

export function getComponents<
  T extends Component,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  U extends new (...args: any[]) => T = new (...args: any[]) => T,
>(this: DisplayObject, componentType: U): T[] {
  const components: T[] = [];
  const gameObjectComponents = this.getAllComponents();

  for (const component of gameObjectComponents) {
    if (component instanceof componentType) {
      components.push(component);
    }
  }

  return components;
}
