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

const onDestroyStub = vi.fn();

class TestComponent extends Component {
  public onDestroy = onDestroyStub;
}

describe('onDestroy hook', () => {
  beforeAll(() => {
    installPlugin();
  });

  afterAll(() => {
    uninstallPlugin();
  });

  beforeEach(() => {
    onDestroyStub.mockClear();
  });

  it('should get called', () => {
    const container1 = new Container();
    const container2 = new Container();

    const component = new TestComponent();
    container2.addComponent(component);

    container1.addChild(container2);
    container1.removeChild(container2);
    expect(onDestroyStub).toHaveBeenCalledOnce();
  });

  it('should get called each time', () => {
    const container1 = new Container();
    const container2 = new Container();

    const component = new TestComponent();
    container2.addComponent(component);

    container1.addChild(container2);
    container1.removeChild(container2);
    expect(onDestroyStub).toHaveBeenCalledTimes(1);

    container1.addChild(container2);
    container1.removeChild(container2);
    expect(onDestroyStub).toHaveBeenCalledTimes(2);
  });
});
