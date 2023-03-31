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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const prototype = DisplayObject.prototype as any;

  /* eslint-disable @typescript-eslint/no-dynamic-delete, @typescript-eslint/no-unsafe-member-access */
  delete prototype[addComponentSymbol];
  delete prototype[removeComponentSymbol];
  delete prototype[getComponentSymbol];
  delete prototype[getComponentsSymbol];
  delete prototype[getAllComponentsSymbol];

  delete prototype.addComponent;
  delete prototype.removeComponent;
  delete prototype.getComponent;
  delete prototype.getComponents;
  delete prototype.getAllComponents;
  /* eslint-enable @typescript-eslint/no-dynamic-delete, @typescript-eslint/no-unsafe-member-access */
}
