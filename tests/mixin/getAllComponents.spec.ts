import { Container } from 'pixi.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { uninstallPlugin } from '../../src/plugin';
import { installPlugin } from '../../src/plugin/installPlugin';
import { TestComponent } from '../utils/TestComponent';

describe('getAllComponents', () => {
  beforeAll(() => {
    installPlugin();
  });

  afterAll(() => {
    uninstallPlugin();
  });

  it.concurrent('should exist in DisplayObject', () => {
    const object = new Container();

    expect(object.getAllComponents).toBeDefined();
  });

  it.concurrent('should get empty list from object if not added', () => {
    const object = new Container();

    expect(object.getAllComponents()).toHaveLength(0);
  });

  it.concurrent('should get components from object', () => {
    const object = new Container();
    const component = new TestComponent();

    object.addComponent(component);

    expect(object.getAllComponents()).toHaveLength(1);
  });

  it.concurrent('should get components in order of addition', () => {
    const object = new Container();
    const component1 = new TestComponent();
    const component2 = new TestComponent();
    const component3 = new TestComponent();

    object.addComponent(component1);
    object.addComponent(component2);
    object.addComponent(component3);

    const components = object.getAllComponents();

    expect(components[0]).toBe(component1);
    expect(components[1]).toBe(component2);
    expect(components[2]).toBe(component3);
  });
});
