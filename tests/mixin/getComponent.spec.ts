import { Container } from '@pixi/display';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { Component } from '@/components/Component';
import { uninstallPlugin } from '@/plugin';
import { installPlugin } from '@/plugin/installPlugin';

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

    expect(object.getComponent(Component)).toBeNull();
  });

  it.concurrent('should get components from object', () => {
    const object = new Container();
    const component = new Component();

    object.addComponent(component);

    expect(object.getComponent(Component)).not.toBeNull();
  });

  it.concurrent('should get first component added of a type', () => {
    const object = new Container();
    const component1 = new Component();
    const component2 = new Component();
    const component3 = new Component();

    object.addComponent(component1);
    object.addComponent(component2);
    object.addComponent(component3);

    expect(object.getComponent(Component)).toBe(component1);

    object.removeComponent(component1);
    expect(object.getComponent(Component)).toBe(component2);

    object.removeComponent(component2);
    expect(object.getComponent(Component)).toBe(component3);
  });

  it.concurrent('should get component added of the given type', () => {
    const object = new Container();

    class TestComponent1 extends Component {}
    class TestComponent2 extends Component {}

    const component1 = new TestComponent1();
    const component2 = new TestComponent2();

    object.addComponent(component1);
    object.addComponent(component2);

    expect(object.getComponent(TestComponent1)).toBe(component1);
    expect(object.getComponent(TestComponent2)).toBe(component2);
  });
});
