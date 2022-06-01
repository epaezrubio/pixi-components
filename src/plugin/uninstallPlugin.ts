import { DisplayObject } from '@pixi/display';

export function uninstallPlugin(): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment
  const prototype = DisplayObject.prototype as Partial<DisplayObject>;

  delete prototype.addComponent;
  delete prototype.removeComponent;
  delete prototype.getComponent;
  delete prototype.getComponents;
  delete prototype.getAllComponents;
}
