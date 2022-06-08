/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error
import { DisplayObject } from 'pixi.js';

import { addComponent } from '../mixin/addComponent';
import { getAllComponents } from '../mixin/getAllComponents';
import { getComponent } from '../mixin/getComponent';
import { getComponents } from '../mixin/getComponents';
import { removeComponent } from '../mixin/removeComponent';

export function installPlugin(): void {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  // @ts-expect-error
  const prototype = DisplayObject.prototype;

  prototype.addComponent = addComponent;
  prototype.removeComponent = removeComponent;
  prototype.getComponent = getComponent;
  prototype.getComponents = getComponents;
  prototype.getAllComponents = getAllComponents;
}
