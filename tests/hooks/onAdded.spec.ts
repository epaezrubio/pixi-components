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

const onAddedStub = vi.fn();

class TestComponent extends Component {
  public onAdded = onAddedStub;
}

describe('onAdded hook', () => {
  beforeAll(() => {
    installPlugin();
  });

  afterAll(() => {
    uninstallPlugin();
  });

  beforeEach(() => {
    onAddedStub.mockClear();
  });

  it('should get called', () => {
    const container = new Container();

    const component = new TestComponent();
    container.addComponent(component);

    expect(onAddedStub).toHaveBeenCalledOnce();
  });

  it('should get called each time', () => {
    const container = new Container();

    const component1 = new TestComponent();
    const component2 = new TestComponent();
    container.addComponent(component1);
    container.addComponent(component2);

    expect(onAddedStub).toHaveBeenCalledTimes(2);
  });
});
