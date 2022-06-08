import { Container } from 'pixi.js';
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
import { uninstallPlugin } from '../../src/plugin';
import { installPlugin } from '../../src/plugin/installPlugin';

const onRemovedStub = vi.fn();

class TestComponent extends Component {
  public onRemoved = onRemovedStub;
}

describe('onRemoved hook', () => {
  beforeAll(() => {
    installPlugin();
  });

  afterAll(() => {
    uninstallPlugin();
  });

  beforeEach(() => {
    onRemovedStub.mockClear();
  });

  it('should get called', () => {
    const container = new Container();

    const component = new TestComponent();
    container.addComponent(component);
    container.removeComponent(component);

    expect(onRemovedStub).toHaveBeenCalledOnce();
  });

  it('should get called each time', () => {
    const container = new Container();

    const component1 = new TestComponent();
    const component2 = new TestComponent();
    container.addComponent(component1);
    container.addComponent(component2);
    container.removeComponent(component1);
    container.removeComponent(component2);

    expect(onRemovedStub).toHaveBeenCalledTimes(2);
  });
});
