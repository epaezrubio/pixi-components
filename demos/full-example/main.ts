import * as dat from 'dat.gui';
import type { Container, InteractionEvent } from 'pixi.js';
import { Application, Sprite, Texture } from 'pixi.js';

import { Component } from '../../src/components/Component';
import { registerUpdateTicker } from '../../src/hooks/registerUpdateTicker';
import { installPlugin } from '../../src/plugin/installPlugin';

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
});

document.body.appendChild(app.view);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  app.view.width = width;
  app.view.height = height;
  app.renderer.resize(width, height);
  app.render();
});

class RotateComponent extends Component {
  public speed: number;

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

class RotateChangerComponent extends Component {
  public update(): void {
    if (!this.gameObject) {
      return;
    }

    const rotateComponent =
      this.gameObject.getComponent<RotateComponent>(RotateComponent);

    if (!rotateComponent) {
      return;
    }

    rotateComponent.speed = Math.sin(Date.now() / 500);
  }
}

class ResizeComponent extends Component {
  public start(): void {
    this.centerObject();
  }

  public onAdded(): void {
    window.addEventListener('resize', this.onResize);
  }

  public onRemoved(): void {
    window.addEventListener('resize', this.onResize);
  }

  private centerObject(): void {
    if (!this.gameObject) {
      return;
    }

    this.gameObject.position.set(
      app.renderer.width / 2,
      app.renderer.height / 2,
    );
  }

  private readonly onResize = (): void => {
    this.centerObject();
  };
}

class FollowCursorComponent extends Component {
  public delay: number;

  private x: number | undefined;

  private y: number | undefined;

  constructor(delay: number) {
    super();

    this.delay = delay;
  }

  public onAdded(): void {
    app.stage.interactive = true;
    app.stage.on('pointermove', this.onMouseMove);
  }

  public onRemoved(): void {
    app.stage.off('pointermove', this.onMouseMove);
  }

  public update(): void {
    if (!this.gameObject || this.x === undefined || this.y === undefined) {
      return;
    }

    const targetX =
      this.gameObject.x + (this.x - this.gameObject.x) * (1.001 - this.delay);
    const targetY =
      this.gameObject.y + (this.y - this.gameObject.y) * (1.001 - this.delay);

    this.gameObject.position.set(targetX, targetY);
  }

  private readonly onMouseMove = (event: InteractionEvent): void => {
    const point = event.data.getLocalPosition(app.stage);

    this.x = point.x;
    this.y = point.y;
  };
}

installPlugin();
registerUpdateTicker(app.ticker, app.stage);

const texture = Texture.from('/demos/assets/bunny.png');

const bunny1 = new Sprite(texture);
const bunny2 = new Sprite(texture);

bunny1.anchor.set(0.5);
bunny1.position.set(app.renderer.width / 2 - 20, app.renderer.height / 2);
bunny2.anchor.set(0.5);
bunny2.position.set(app.renderer.width / 2 + 20, app.renderer.height / 2);

app.stage.addChild(bunny1);
app.stage.addChild(bunny2);

const gui = new dat.GUI();
gui.domElement.style.opacity = '0.9';

function createGuiFolder(name: string, bunny: Container): void {
  const folder = gui.addFolder(name);
  folder.open();

  const guiControls = {
    rotationSpeed: 0.1,
    addRotation(): void {
      const component = bunny.getComponent(RotateComponent);

      if (!component) {
        bunny.addComponent(new RotateComponent(guiControls.rotationSpeed));
      }
    },
    removeRotation(): void {
      const component = bunny.getComponent(RotateComponent);

      if (component) {
        bunny.removeComponent(component);
      }
    },
    addRotationChanger(): void {
      const component = bunny.getComponent(RotateChangerComponent);

      if (!component) {
        bunny.addComponent(new RotateChangerComponent());
      }
    },
    removeRotationChanger(): void {
      const component = bunny.getComponent(RotateChangerComponent);

      if (component) {
        bunny.removeComponent(component);
      }
    },
    followCursorDelay: 0.01,
    addFollowCursor(): void {
      const component = bunny.getComponent(FollowCursorComponent);

      if (!component) {
        bunny.addComponent(
          new FollowCursorComponent(guiControls.followCursorDelay),
        );
      }
    },
    removeFollowCursor(): void {
      const component = bunny.getComponent(FollowCursorComponent);

      if (component) {
        bunny.removeComponent(component);
      }
    },
    addResize(): void {
      const component = bunny.getComponent(ResizeComponent);

      if (!component) {
        bunny.addComponent(new ResizeComponent());
      }
    },
    removeResize(): void {
      const component = bunny.getComponent(ResizeComponent);

      if (component) {
        bunny.removeComponent(component);
      }
    },
  };

  const rotationControl = folder.add(guiControls, 'rotationSpeed', -1, 1, 0.05);
  rotationControl.onChange((value: number) => {
    const component = bunny.getComponent<RotateComponent>(RotateComponent);

    if (!component) {
      return;
    }

    component.speed = value;
  });

  setInterval(() => {
    const component = bunny.getComponent<RotateComponent>(RotateComponent);

    if (!component) {
      return;
    }

    rotationControl.setValue(component.speed);
  }, 50);

  folder.add(guiControls, 'addRotation');
  folder.add(guiControls, 'removeRotation');
  folder.add(guiControls, 'addRotationChanger');
  folder.add(guiControls, 'removeRotationChanger');

  const followCursorDelayControl = folder.add(
    guiControls,
    'followCursorDelay',
    0,
    1,
    0.01,
  );
  followCursorDelayControl.onChange((value: number) => {
    const component = bunny.getComponent<FollowCursorComponent>(
      FollowCursorComponent,
    );

    if (!component) {
      return;
    }

    component.delay = value;
  });

  folder.add(guiControls, 'addFollowCursor');
  folder.add(guiControls, 'removeFollowCursor');
  folder.add(guiControls, 'addResize');
  folder.add(guiControls, 'removeResize');
}

createGuiFolder('bunny1', bunny1);
createGuiFolder('bunny2', bunny2);
