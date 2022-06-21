import { Container } from 'pixi.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import type { Component } from '../../src/components';
import { Actor } from '../../src/components/Actor';
import { installPlugin, uninstallPlugin } from '../../src/plugin';
import { TestComponent } from '../utils/TestComponent';

export class TestActor extends Actor {
  public testComponent1: TestComponent | undefined;

  public testComponent2: TestComponent | undefined;

  constructor() {
    super();

    this.components = this.createComponents();
  }

  protected createComponents(): Component[] {
    this.testComponent1 = new TestComponent();
    this.testComponent2 = new TestComponent();

    return [this.testComponent1, this.testComponent2];
  }
}

describe('Actor', () => {
  beforeAll(() => {
    installPlugin();
  });

  afterAll(() => {
    uninstallPlugin();
  });

  it('should add components', () => {
    const container = new Container();
    const actor = new TestActor();

    container.addComponent(actor);

    if (
      !actor.testComponent1?.gameObject ||
      !actor.testComponent2?.gameObject
    ) {
      throw new Error('Component not added');
    }

    expect(actor.testComponent1.gameObject).toBe(container);
    expect(actor.testComponent2.gameObject).toBe(container);
  });

  it('should remove components', () => {
    const container = new Container();
    const actor = new TestActor();

    container.addComponent(actor);

    if (
      !actor.testComponent1?.gameObject ||
      !actor.testComponent2?.gameObject
    ) {
      throw new Error('Component not added');
    }

    container.removeComponent(actor);

    expect(actor.testComponent1.gameObject).toBeUndefined();
    expect(actor.testComponent2.gameObject).toBeUndefined();
  });
});
