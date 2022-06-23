/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error
import { DisplayObject } from 'pixi.js';

import { addComponent as addComponentSymbol } from './symbols';

/**
 * Checks if the pixi-component plugin is currently installed
 *
 * @returns True if the plugin is installed
 */
export function isInstalled(): boolean {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  // @ts-expect-error
  const prototype = DisplayObject.prototype;

  return addComponentSymbol in prototype;
}
