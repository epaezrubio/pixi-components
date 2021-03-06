import { Container } from 'pixi.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { uninstallPlugin } from '../../src/plugin';
import { installPlugin } from '../../src/plugin/installPlugin';
import { TestComponent } from '../utils/TestComponent';

describe('getComponents', () => {
  beforeAll(() => {
    installPlugin();
  });

  afterAll(() => {
    uninstallPlugin();
  });

  it.concurrent('should exist in DisplayObject', () => {
    const object = new Container();

    expect(object.getComponents).toBeDefined();
  });

  it.concurrent('should get empty list from object if not added', () => {
    const object = new Container();

    expect(object.getComponents(TestComponent)).toHaveLength(0);
  });

  it.concurrent('should get components from object', () => {
    const object = new Container();
    const component = new TestComponent();

    object.addComponent(component);

    expect(object.getComponents(TestComponent)).toHaveLength(1);
  });

  it.concurrent('should get components in order of addition', () => {
    const object = new Container();
    const component1 = new TestComponent();
    const component2 = new TestComponent();
    const component3 = new TestComponent();

    object.addComponent(component1);
    object.addComponent(component2);
    object.addComponent(component3);

    const components = object.getComponents(TestComponent);

    expect(components[0]).toBe(component1);
    expect(components[1]).toBe(component2);
    expect(components[2]).toBe(component3);
  });

  it.concurrent('should get component added of the given type', () => {
    const object = new Container();

    class TestComponent1 extends TestComponent {}
    class TestComponent2 extends TestComponent {}

    const component1 = new TestComponent1();
    const component2 = new TestComponent2();

    object.addComponent(component1);
    object.addComponent(component2);

    const components = object.getComponents(TestComponent1);

    expect(components).toHaveLength(1);
    expect(components[0]).toBe(component1);
  });
});
