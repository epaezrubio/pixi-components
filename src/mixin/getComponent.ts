import type { DisplayObject } from '@pixi/display';

import type { Component } from '../components/Component';

export function getComponent<
  T extends Component,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  U extends new (...args: any[]) => T = new (...args: any[]) => T,
>(this: DisplayObject, componentType: U): T | null {
  const gameObjectComponents = this.getAllComponents();

  for (const component of gameObjectComponents) {
    if (component instanceof componentType) {
      return component;
    }
  }

  return null;
}
