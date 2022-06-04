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

installPlugin();
registerUpdateTicker(app.ticker, app.stage);

const texture = Texture.from('/demos/assets/bunny.png');
const bunny = new Sprite(texture);

const rotateComponent = new RotateComponent(0.05);

bunny.addComponent(rotateComponent);

bunny.anchor.set(0.5);
bunny.position.set(app.renderer.width / 2, app.renderer.height / 2);

app.stage.addChild(bunny);
