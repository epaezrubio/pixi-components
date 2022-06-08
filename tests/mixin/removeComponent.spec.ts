import { Container } from 'pixi.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { componentsMap } from '../../src/mixin/componentsMap';
import { uninstallPlugin } from '../../src/plugin';
import { installPlugin } from '../../src/plugin/installPlugin';
import { TestComponent } from '../utils/TestComponent';

import { GameObjectTestComponent } from 'tests/utils/GameObjectTestComponent';

describe('removeComponent', () => {
  beforeAll(() => {
    installPlugin();
  });

  afterAll(() => {
    uninstallPlugin();
  });

  it.concurrent('should exist in DisplayObject', () => {
    const object = new Container();

    expect(object.removeComponent).toBeDefined();
  });

  it.concurrent('should remove components from list', () => {
    const object = new Container();
    const component = new TestComponent();

    object.addComponent(component);
    object.removeComponent(component);

    expect(componentsMap.has(object)).toBeTruthy();
    expect(componentsMap.get(object)).toHaveLength(0);
  });

  it.concurrent('should not crash if component is not added', () => {
    const object = new Container();
    const component = new TestComponent();

    expect(() => {
      object.removeComponent(component);
    }).not.toThrowError();
  });

  it.concurrent('should remove multiple components from one object', () => {
    const object = new Container();
    const component1 = new TestComponent();
    const component2 = new TestComponent();

    object.addComponent(component1);
    object.addComponent(component2);
    object.removeComponent(component1);
    object.removeComponent(component2);

    expect(componentsMap.get(object)).toHaveLength(0);
  });

  it.concurrent(
    'should remove multiple components from multiple objects',
    () => {
      const object1 = new Container();
      const object2 = new Container();
      const component1 = new TestComponent();
      const component2 = new TestComponent();

      object1.addComponent(component1);
      object2.addComponent(component2);
      object1.removeComponent(component1);
      object2.removeComponent(component2);

      expect(componentsMap.get(object1)).toHaveLength(0);
      expect(componentsMap.get(object2)).toHaveLength(0);

      const getComponent1 = componentsMap.get(object1);
      const getComponent2 = componentsMap.get(object2);

      if (!getComponent1 || !getComponent2) {
        throw new Error('retrieving added components failed');
      }

      expect(componentsMap.get(object1)).toHaveLength(0);
      expect(componentsMap.get(object2)).toHaveLength(0);
    },
  );

  it.concurrent('should add gameObject to component', () => {
    const object = new Container();

    const component = new GameObjectTestComponent();
    object.addComponent(component);
    object.removeComponent(component);

    expect(component.pGameObject).toBe(undefined);
  });
});
