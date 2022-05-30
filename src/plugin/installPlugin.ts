import { DisplayObject } from '@pixi/display';

import { addComponent } from '@/mixin/addComponent';
import { getAllComponents } from '@/mixin/getAllComponents';

export function installPlugin(): void {
  DisplayObject.prototype.addComponent = addComponent;
  DisplayObject.prototype.getAllComponents = getAllComponents;
}
