import type { DisplayObject } from 'pixi.js';

/**
 * Base abstract class that provides the template for all derived components.
 *
 * @abstract
 */
export abstract class Component<T extends DisplayObject = DisplayObject> {
  /**
   * Enabled components are updated on each tick, disabled components are not.
   */
  public enabled = true;

  private _gameObject: T | undefined;

  /**
   * Reference to the pixi object where this component has been added.
   */
  public get gameObject(): T | undefined {
    return this._gameObject;
  }

  private set gameObject(value: T | undefined) {
    this._gameObject = value;
  }

  /**
   * Gets called when the component is added to an object, but before `start`.
   */
  public onAdded(): void {
    /* noop */
  }

  /**
   * Gets called when the component is removed from an object.
   */
  public onRemoved(): void {
    /* noop */
  }

  /**
   * Gets called when the object is added to a parent. If the component is added to an object when it already has a parent, this gets called after `onAdded`.
   */
  public start(): void {
    /* noop */
  }

  /**
   * Gets called for each tick of the registered ticker as long as the object is a descendant of the registered root (typically app.stage)
   *
   * @param _deltaTime Duration in ms since last ticker update
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_deltaTime: number): void {
    /* noop */
  }

  /**
   * Gets called when the object is removed from its parent.
   */
  public onDestroy(): void {
    /* noop */
  }

  /**
   * This function is for internal use and not meant to be called by the consumer.
   *
   * @private
   */
  public setGameObject(gameObject: T | undefined): void {
    if (gameObject === this.gameObject) {
      return;
    }

    if (this.gameObject) {
      this.onRemoved();
      this.removeObjectHooks(this.gameObject);
    }

    this.gameObject = gameObject;

    if (this.gameObject) {
      this.onAdded();
      this.addObjectHooks(this.gameObject);

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions
      if (this.gameObject.parent) {
        // gameObject.parent can actually be undefined
        this.start();
      }
    }
  }

  private removeObjectHooks(gameObject: T): void {
    gameObject.off('added', this.onStart);
    gameObject.off('removed', this.onDestroyed);
  }

  private addObjectHooks(gameObject: T): void {
    gameObject.on('added', this.onStart);
    gameObject.on('removed', this.onDestroyed);
  }

  private readonly onStart = (): void => {
    this.start();
  };

  private readonly onDestroyed = (): void => {
    this.onDestroy();
  };
}
