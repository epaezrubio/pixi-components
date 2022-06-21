import type { DisplayObject } from 'pixi.js';

import { Component } from './Component';

/**
 * Abstract class that provides the template for actor components. Actors are components
 * that group a set of other components.
 *
 * @abstract
 */
export abstract class Actor<
  T extends DisplayObject = DisplayObject,
> extends Component<T> {
  protected components: Component[] = [];

  public onAdded(): void {
    if (!this.gameObject) {
      return;
    }

    for (const component of this.components) {
      this.gameObject.addComponent(component);
    }

    super.onAdded();
  }

  public onRemoved(): void {
    if (!this.gameObject) {
      return;
    }

    for (const component of this.components) {
      this.gameObject.removeComponent(component);
    }

    super.onRemoved();
  }

  protected abstract createComponents(): Component[];
}
