/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error
import { DisplayObject } from 'pixi.js';

import {
  addComponent as addComponentSymbol,
  removeComponent as removeComponentSymbol,
  getComponent as getComponentSymbol,
  getComponents as getComponentsSymbol,
  getAllComponents as getAllComponentsSymbol,
} from './symbols';

/**
 * Removes the plugin methods from the DisplayObject prototype:
 *
 * - addComponent
 * - removeComponent
 * - getComponent
 * - getComponents
 * - getAllComponents
 */
export function uninstallPlugin(): void {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  // @ts-expect-error
  const prototype = DisplayObject.prototype;

  /* eslint-disable @typescript-eslint/no-dynamic-delete */
  delete prototype[addComponentSymbol];
  delete prototype[removeComponentSymbol];
  delete prototype[getComponentSymbol];
  delete prototype[getComponentsSymbol];
  delete prototype[getAllComponentsSymbol];
  /* eslint-enable @typescript-eslint/no-dynamic-delete */

  delete prototype.addComponent;
  delete prototype.removeComponent;
  delete prototype.getComponent;
  delete prototype.getComponents;
  delete prototype.getAllComponents;
}
