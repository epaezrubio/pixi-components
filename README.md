# pixi-components

[![Project check](https://github.com/epaezrubio/pixi-components/actions/workflows/project-check.yaml/badge.svg)](https://github.com/epaezrubio/pixi-components/actions/workflows/project-check.yaml)
[![codecov](https://codecov.io/gh/epaezrubio/pixi-components/branch/master/graph/badge.svg?token=AZKGT9U2NO)](https://codecov.io/gh/epaezrubio/pixi-components)
[![npm version](https://badge.fury.io/js/pixi-components.svg)](https://badge.fury.io/js/pixi-components)

A pixi.js plugin that adds methods for a component-based architecture in pixi. It has a very similar API like Unity's GameObject and MonoBehaviour.

The motivation behind this approach is to create single-responsibility components that are easier to reuse, test and debug. On top of that, it enables development experience features like __hot module replacement__ (with limitations).

## Getting started

```
npm install pixi-components
```

The plugin needs to be installed manually and bound to the application ticker:

```typescript
import { installPlugin } from 'pixi-components';

installPlugin();
registerUpdateTicker(app.ticker, app.stage);
```

## Example

```typescript
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
```

## Development

1. Clone the repository
2. Install the dependencies with `npm ci`
3. Run the development server with `npm run dev`

Alternatively, run the tests in watch mode with `npm run test -- --watch`

## License

MIT