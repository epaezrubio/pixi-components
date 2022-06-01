import { DisplayObject } from '@pixi/display';

import { addComponent } from '@/mixin/addComponent';
import { getAllComponents } from '@/mixin/getAllComponents';
import { getComponent } from '@/mixin/getComponent';
import { getComponents } from '@/mixin/getComponents';
import { removeComponent } from '@/mixin/removeComponent';

export function installPlugin(): void {
  DisplayObject.prototype.addComponent = addComponent;
  DisplayObject.prototype.removeComponent = removeComponent;
  DisplayObject.prototype.getComponent = getComponent;
  DisplayObject.prototype.getComponents = getComponents;
  DisplayObject.prototype.getAllComponents = getAllComponents;
}
