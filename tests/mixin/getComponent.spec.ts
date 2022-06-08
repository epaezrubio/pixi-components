import { Container } from 'pixi.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { uninstallPlugin } from '../../src/plugin';
import { installPlugin } from '../../src/plugin/installPlugin';
import { TestComponent } from '../utils/TestComponent';

describe('getComponent', () => {
  beforeAll(() => {
    installPlugin();
  });

  afterAll(() => {
    uninstallPlugin();
  });

  it.concurrent('should exist in DisplayObject', () => {
    const object = new Container();

    expect(object.getComponent).toBeDefined();
  });

  it.concurrent('should get not components from object if not added', () => {
    const object = new Container();

    expect(object.getComponent(TestComponent)).toBeNull();
  });

  it.concurrent('should get components from object', () => {
    const object = new Container();
    const component = new TestComponent();

    object.addComponent(component);

    expect(object.getComponent(TestComponent)).not.toBeNull();
  });

  it.concurrent('should get first component added of a type', () => {
    const object = new Container();
    const component1 = new TestComponent();
    const component2 = new TestComponent();
    const component3 = new TestComponent();

    object.addComponent(component1);
    object.addComponent(component2);
    object.addComponent(component3);

    expect(object.getComponent(TestComponent)).toBe(component1);

    object.removeComponent(component1);
    expect(object.getComponent(TestComponent)).toBe(component2);

    object.removeComponent(component2);
    expect(object.getComponent(TestComponent)).toBe(component3);
  });

  it.concurrent('should get component added of the given type', () => {
    const object = new Container();

    class TestComponent1 extends TestComponent {}
    class TestComponent2 extends TestComponent {}

    const component1 = new TestComponent1();
    const component2 = new TestComponent2();

    object.addComponent(component1);
    object.addComponent(component2);

    expect(object.getComponent(TestComponent1)).toBe(component1);
    expect(object.getComponent(TestComponent2)).toBe(component2);
  });
});
