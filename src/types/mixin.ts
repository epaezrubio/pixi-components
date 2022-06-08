import type { Component } from '../components/Component';

export interface ExtendedDisplayObject<DisplayObject> {
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

declare module 'pixi.js' {
  interface DisplayObject {
    addComponent: ExtendedDisplayObject<DisplayObject>['addComponent'];
    removeComponent: ExtendedDisplayObject<DisplayObject>['removeComponent'];
    getComponent: ExtendedDisplayObject<DisplayObject>['getComponent'];
    getComponents: ExtendedDisplayObject<DisplayObject>['getComponents'];
    getAllComponents: ExtendedDisplayObject<DisplayObject>['getAllComponents'];
  }
}
