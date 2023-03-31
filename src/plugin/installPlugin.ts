import { DisplayObject } from 'pixi.js';

import { addComponent } from '../mixin/addComponent';
import { getAllComponents } from '../mixin/getAllComponents';
import { getComponent } from '../mixin/getComponent';
import { getComponents } from '../mixin/getComponents';
import { removeComponent } from '../mixin/removeComponent';

import {
  addComponent as addComponentSymbol,
  removeComponent as removeComponentSymbol,
  getComponent as getComponentSymbol,
  getComponents as getComponentsSymbol,
  getAllComponents as getAllComponentsSymbol,
} from './symbols';

/**
 * Adds the plugin methods to the DisplayObject prototype:
 *
 * - addComponent
 * - removeComponent
 * - getComponent
 * - getComponents
 * - getAllComponents
 *
 * If symbolsOnly is true, these prototype methods will be added as symbols only,
 * resulting in a less poluted prototype. The downside is having to import the symbols
 * to access the methods:
 *
 * ```
 * import { symbols } from 'pixi-components';
 *
 * // ...
 *
 * component[symbols.addComponent](myComponent);
 * ```
 *
 * @param symbolsOnly Install methods as symbols only or as named properties too
 */
export function installPlugin(symbolsOnly = false): void {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const prototype = DisplayObject.prototype as any;

  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  prototype[addComponentSymbol] = addComponent;
  prototype[removeComponentSymbol] = removeComponent;
  prototype[getComponentSymbol] = getComponent;
  prototype[getComponentsSymbol] = getComponents;
  prototype[getAllComponentsSymbol] = getAllComponents;

  if (symbolsOnly) {
    return;
  }

  prototype.addComponent = addComponent;
  prototype.removeComponent = removeComponent;
  prototype.getComponent = getComponent;
  prototype.getComponents = getComponents;
  prototype.getAllComponents = getAllComponents;
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
}
