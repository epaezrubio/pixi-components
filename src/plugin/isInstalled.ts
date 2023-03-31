import { DisplayObject } from 'pixi.js';

import { addComponent as addComponentSymbol } from './symbols';

/**
 * Checks if the pixi-component plugin is currently installed
 *
 * @returns True if the plugin is installed
 */
export function isInstalled(): boolean {
  const prototype = DisplayObject.prototype;

  return addComponentSymbol in prototype;
}
