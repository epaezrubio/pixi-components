import { Application, Sprite, Texture } from 'pixi.js';

import { registerUpdateTicker } from '../../src/hooks/registerUpdateTicker';
import { installPlugin } from '../../src/plugin/installPlugin';

import { RotateComponent } from './RotateComponent';

const app = new Application<HTMLCanvasElement>({
  width: window.innerWidth,
  height: window.innerHeight,
});

document.body.appendChild(app.view);

installPlugin();
registerUpdateTicker(app.ticker, app.stage);

const texture = Texture.from('/demos/assets/bunny.png');
const bunny = new Sprite(texture);

const rotateComponent = new RotateComponent(0.05);

bunny.addComponent(rotateComponent);

bunny.anchor.set(0.5);
bunny.position.set(app.renderer.width / 2, app.renderer.height / 2);

app.stage.addChild(bunny);
