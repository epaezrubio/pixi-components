import { Application, Sprite, Texture } from 'pixi.js';

import { Component } from '@/components/Component';
import { registerUpdateTicker } from '@/hooks/registerUpdateTicker';
import { installPlugin } from '@/plugin/installPlugin';

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
});

document.body.appendChild(app.view);

class RotateComponent extends Component {
  speed: number;

  constructor(speed: number) {
    super();

    this.speed = speed;
  }

  public update(deltaTime: number): void {
    if (!this.gameObject) {
      return;
    }

    this.gameObject.rotation += this.speed * deltaTime;
  }
}

class RotateSpeedChangerComponent extends Component {
  private rotateComponent: RotateComponent | null = null;

  public start(): void {
    if (!this.gameObject) {
      return;
    }

    this.gameObject.interactive = true;
    this.gameObject.cursor = 'pointer';
    this.gameObject.on('pointertap', this.onClick);

    this.rotateComponent = this.gameObject.getComponent(RotateComponent);
  }

  public onRemoved(): void {
    if (!this.gameObject) {
      return;
    }

    this.gameObject.off('pointertap', this.onClick);
  }

  private readonly onClick = (): void => {
    if (!this.rotateComponent) {
      return;
    }

    this.rotateComponent.speed =
      this.rotateComponent.speed === 0.15 ? 0.05 : 0.15;
  };
}

installPlugin();
registerUpdateTicker(app.ticker, app.stage);

const texture = Texture.from('/demos/assets/bunny.png');
const bunny = new Sprite(texture);

const rotateComponent = new RotateComponent(0.05);
const rotateSpeedChangerComponent = new RotateSpeedChangerComponent();

bunny.addComponent(rotateComponent);
bunny.addComponent(rotateSpeedChangerComponent);

bunny.anchor.set(0.5);
bunny.position.set(app.renderer.width / 2, app.renderer.height / 2);

app.stage.addChild(bunny);
