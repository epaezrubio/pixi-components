import { Container } from '@pixi/display';
import { Ticker } from '@pixi/ticker';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { Component } from '../../src/components/Component';
import { registerUpdateTicker } from '../../src/hooks/registerUpdateTicker';
import { uninstallPlugin } from '../../src/plugin';
import { installPlugin } from '../../src/plugin/installPlugin';

class TestComponent extends Component {
  public updateCalls = 0;

  public update(): void {
    this.updateCalls++;
  }
}

describe('update hook', () => {
  beforeAll(() => {
    installPlugin();
  });

  afterAll(() => {
    uninstallPlugin();
  });

  it('should work only after ticker is registered', () => {
    const container1 = new Container();
    const container2 = new Container();
    const container3 = new Container();

    const component = new TestComponent();
    container3.addComponent(component);

    container1.addChild(container2);
    container2.addChild(container3);

    expect(component.updateCalls).toBe(0);

    const ticker = new Ticker();
    registerUpdateTicker(ticker, container1);

    expect(component.updateCalls).toBe(0);

    ticker.update();
    expect(component.updateCalls).toBe(1);

    ticker.update();
    expect(component.updateCalls).toBe(2);
  });

  it.concurrent('should tick all components', () => {
    const container = new Container();

    const component1 = new TestComponent();
    const component2 = new TestComponent();

    container.addComponent(component1);
    container.addComponent(component2);

    expect(component1.updateCalls).toBe(0);
    expect(component2.updateCalls).toBe(0);

    const ticker = new Ticker();
    registerUpdateTicker(ticker, container);

    expect(component1.updateCalls).toBe(0);
    expect(component2.updateCalls).toBe(0);

    ticker.update();
    expect(component1.updateCalls).toBe(1);
    expect(component2.updateCalls).toBe(1);

    ticker.update();
    expect(component1.updateCalls).toBe(2);
    expect(component2.updateCalls).toBe(2);
  });

  it.concurrent('should tick components independently', () => {
    const container = new Container();

    const component1 = new TestComponent();
    const component2 = new TestComponent();

    container.addComponent(component1);

    expect(component1.updateCalls).toBe(0);
    expect(component2.updateCalls).toBe(0);

    const ticker = new Ticker();
    registerUpdateTicker(ticker, container);

    expect(component1.updateCalls).toBe(0);
    expect(component2.updateCalls).toBe(0);

    ticker.update();
    expect(component1.updateCalls).toBe(1);
    expect(component2.updateCalls).toBe(0);

    container.addComponent(component2);

    ticker.update();
    expect(component1.updateCalls).toBe(2);
    expect(component2.updateCalls).toBe(1);
  });
});
