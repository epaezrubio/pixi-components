import type { DisplayObject } from '@pixi/display';

import type { Component } from '../components/Component';
import { componentsMap } from '../mixin/componentsMap';

export function getAllComponents(this: DisplayObject): Component[] {
  const components: Component[] = [];

  if (!componentsMap.has(this)) {
    return components;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const gameObjectComponents = componentsMap.get(this)!;

  return [...gameObjectComponents];
}
