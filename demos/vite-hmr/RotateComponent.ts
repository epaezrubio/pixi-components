import { Component } from '../../src/components/Component';
import { activateHMR } from '../../src/dev/activateHMR';

export class RotateComponent extends Component {
  speed: number;

  constructor(speed: number) {
    super();

    this.speed = speed;

    if (import.meta.hot) {
      import.meta.hot.accept((newModule: Record<string, unknown>) => {
        activateHMR(newModule, this, this.speed);
      });
    }
  }

  public update(deltaTime: number): void {
    if (!this.gameObject) {
      return;
    }

    // Experiment commenting and uncommenting the following lines:
    this.gameObject.rotation += this.speed * deltaTime;
    // this.gameObject.rotation -= this.speed * deltaTime;
  }
}
