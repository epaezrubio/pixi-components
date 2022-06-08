import type { DisplayObject } from 'pixi.js';

import { Component } from '../../src/components/Component';

export class GameObjectTestComponent extends Component {
  get pGameObject(): DisplayObject | undefined {
    return this.gameObject;
  }
}
