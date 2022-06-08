import { Container } from 'pixi.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { componentsMap } from '../../src/mixin/componentsMap';
import { uninstallPlugin } from '../../src/plugin';
import { installPlugin } from '../../src/plugin/installPlugin';
import { TestComponent } from '../utils/TestComponent';

import { GameObjectTestComponent } from 'tests/utils/GameObjectTestComponent';

describe('addComponent', () => {
  beforeAll(() => {
    installPlugin();
  });

  afterAll(() => {
    uninstallPlugin();
  });

  it.concurrent('should exist in DisplayObject', () => {
    const object = new Container();

    expect(object.addComponent).toBeDefined();
  });

  it.concurrent('should add components to list', () => {
    const object = new Container();
    const component = new TestComponent();

    object.addComponent(component);

    expect(componentsMap.has(object)).toBeTruthy();
    expect(componentsMap.get(object)).toHaveLength(1);
  });

  it.concurrent('should add multiple components to one object', () => {
    const object = new Container();
    const component1 = new TestComponent();
    const component2 = new TestComponent();

    object.addComponent(component1);
    object.addComponent(component2);

    expect(componentsMap.get(object)).toHaveLength(2);
  });

  it.concurrent('should add multiple components to multiple objects', () => {
    const object1 = new Container();
    const object2 = new Container();
    const component1 = new TestComponent();
    const component2 = new TestComponent();

    object1.addComponent(component1);
    object2.addComponent(component2);

    expect(componentsMap.get(object1)).toHaveLength(1);
    expect(componentsMap.get(object2)).toHaveLength(1);

    const getComponent1 = componentsMap.get(object1);
    const getComponent2 = componentsMap.get(object2);

    if (!getComponent1 || !getComponent2) {
      throw new Error('retrieving added components failed');
    }

    expect(getComponent1).not.toBe(getComponent2);
  });

  it.concurrent('should add gameObject to component', () => {
    const object = new Container();

    const component = new GameObjectTestComponent();

    expect(component.pGameObject).toBe(undefined);

    object.addComponent(component);

    expect(component.pGameObject).not.toBe(undefined);
  });
});
