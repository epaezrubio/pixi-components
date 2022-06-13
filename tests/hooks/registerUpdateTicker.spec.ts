import { Container, Ticker } from 'pixi.js';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { Component } from '../../src/components/Component';
import { registerUpdateTicker } from '../../src/hooks';
import { uninstallPlugin } from '../../src/plugin';
import { installPlugin } from '../../src/plugin/installPlugin';

const updateStub = vi.fn();

class TestComponent extends Component {
  public update = updateStub;
}

describe('registerUpdateTicker', () => {
  beforeAll(() => {
    installPlugin();
  });

  afterAll(() => {
    uninstallPlugin();
  });

  beforeEach(() => {
    updateStub.mockClear();
  });

  it('should return a registration stop callback', () => {
    const container = new Container();
    const component = new TestComponent();
    const ticker = new Ticker();
    container.addComponent(component);

    const unregisterTicker = registerUpdateTicker(ticker, container);
    ticker.update();

    expect(updateStub).toHaveBeenCalledOnce();
    unregisterTicker();
    ticker.update();

    expect(updateStub).toHaveBeenCalledOnce();
  });
});
