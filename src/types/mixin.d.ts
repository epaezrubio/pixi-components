import type { Component } from '@/components/Component';

declare module '@pixi/display' {
  interface DisplayObject {
    addComponent: (component: Component) => void;
    removeComponent: (component: Component) => void;
    getComponent: <
      T extends Component,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      U extends new (...args: any[]) => T = new (...args: any[]) => T,
    >(
      this: DisplayObject,
      componentType: U,
    ) => T | null;
    getComponents: <
      T extends Component,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      U extends new (...args: any[]) => T = new (...args: any[]) => T,
    >(
      this: DisplayObject,
      componentType: U,
    ) => T[];
    getAllComponents: (this: DisplayObject) => Component[];
  }
}
