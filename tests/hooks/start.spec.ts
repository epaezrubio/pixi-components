import { Container } from '@pixi/display';
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

const startStub = vi.fn();

class TestComponent extends Component {
  public start = startStub;
}

describe('start hook', () => {
  beforeAll(() => {
    installPlugin();
  });

  afterAll(() => {
    uninstallPlugin();
  });

  beforeEach(() => {
    startStub.mockClear();
  });

  it('should get called', () => {
    const container1 = new Container();
    const container2 = new Container();

    const component = new TestComponent();
    container2.addComponent(component);

    container1.addChild(container2);
    expect(startStub).toHaveBeenCalledOnce();
  });

  it('should get called each time', () => {
    const container1 = new Container();
    const container2 = new Container();

    const component = new TestComponent();
    container2.addComponent(component);

    container1.addChild(container2);
    expect(startStub).toHaveBeenCalledTimes(1);

    container1.removeChild(container2);
    expect(startStub).toHaveBeenCalledTimes(1);

    container1.addChild(container2);
    expect(startStub).toHaveBeenCalledTimes(2);
  });

  it('should get called after adding component if object has parent', () => {
    const container1 = new Container();
    const container2 = new Container();

    container1.addChild(container2);

    const component = new TestComponent();
    container2.addComponent(component);

    expect(startStub).toHaveBeenCalledTimes(1);
  });

  it('should not get called after adding component if object has no parent', () => {
    const container = new Container();

    const component = new TestComponent();
    container.addComponent(component);

    expect(startStub).not.toHaveBeenCalled();
  });
});
