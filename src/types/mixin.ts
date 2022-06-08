import type { Component } from '../components/Component';

declare module 'pixi.js' {
  interface DisplayObject {
    /**
     * Adds a component instance to the current object.
     *
     * If the passed component was attached to a different object, it gets removed from there and it triggers its `onRemoved` hook.
     *
     * After that, the `onAdded` hook gets called.
     *
     * Finally, if the object has a parent, the `start` method is triggered.
     *
     * @param component Instance of the component to be added.
     */
    addComponent: (component: Component) => void;
    /**
     * Removes a component instance from the current object.
     *
     * If the passed component instance is found, it gets removed and it triggers its `onRemoved` hook.
     *
     * If the object does not own the passed component instance, the method fails silently without side effects.
     *
     * @param component Component instance that needs to be removed.
     */
    removeComponent: (component: Component) => void;
    /**
     * Returns a component instance of the specified type.
     *
     * If the object has more than one component of this type, the oldest one gets returned (in order of addition).
     *
     * If the component does not have any component of that kind, `null` is returned.
     *
     * @param componentType Reference to the class of the component type
     * @returns Component instance of the specified type
     */
    getComponent: <
      T extends Component,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      U extends new (...args: any[]) => T = new (...args: any[]) => T,
    >(
      this: DisplayObject,
      componentType: U,
    ) => T | null;
    /**
     * Returns the list of component instances of the given type attached to this object.
     *
     * If the object does not have any component of that kind, an empty list is returned.
     *
     * @param componentType Reference to the class of the component type
     * @returns List of component instances of the specified type
     */
    getComponents: <
      T extends Component,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      U extends new (...args: any[]) => T = new (...args: any[]) => T,
    >(
      this: DisplayObject,
      componentType: U,
    ) => T[];
    /**
     * @returns List of components registered for the current object.
     */
    getAllComponents: (this: DisplayObject) => Component[];
  }
}
