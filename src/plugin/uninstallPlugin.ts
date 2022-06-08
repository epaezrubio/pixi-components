/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-expect-error
import { DisplayObject } from 'pixi.js';

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
  const prototype = DisplayObject.prototype as ExtendedDisplayObject;

  delete prototype.addComponent;
  delete prototype.removeComponent;
  delete prototype.getComponent;
  delete prototype.getComponents;
  delete prototype.getAllComponents;
}
