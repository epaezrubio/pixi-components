import type { DisplayObject } from '@pixi/display';

export class Component<T extends DisplayObject = DisplayObject> {
  private _gameObject: T | undefined;

  public get gameObject(): T | undefined {
    return this._gameObject;
  }

  private set gameObject(value: T | undefined) {
    this._gameObject = value;
  }

  public start(): void {
    /* noop */
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_deltaTime: number): void {
    /* noop */
  }

  public onDestroy(): void {
    /* noop */
  }

  /**
   * This function is not meant to be called by the user
   */
  public setGameObject(gameObject: T | undefined): void {
    if (gameObject === this.gameObject) {
      return;
    }

    if (this.gameObject) {
      this.removeObjectHooks(this.gameObject);
    }

    this.gameObject = gameObject;

    if (this.gameObject) {
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
