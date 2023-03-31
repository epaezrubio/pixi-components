import { DisplayObject } from 'pixi.js';
import { describe, expect, it } from 'vitest';

import { installPlugin, uninstallPlugin, symbols } from '../../src/plugin';
import {
  addComponent as addComponentSymbol,
  removeComponent as removeComponentSymbol,
  getComponent as getComponentSymbol,
  getComponents as getComponentsSymbol,
  getAllComponents as getAllComponentsSymbol,
} from '../../src/plugin/symbols';

describe('symbols', () => {
  it('should be exported', () => {
    expect(symbols).toBeDefined();
  });
});

describe('installPlugin', () => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  describe('DisplayObject prototype', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    const prototype = DisplayObject.prototype as any;

    it('should install symbol methods', () => {
      installPlugin();

      expect(prototype[addComponentSymbol]).toBeDefined();
      expect(prototype[removeComponentSymbol]).toBeDefined();
      expect(prototype[getComponentSymbol]).toBeDefined();
      expect(prototype[getComponentsSymbol]).toBeDefined();
      expect(prototype[getAllComponentsSymbol]).toBeDefined();

      uninstallPlugin();
    });

    it('should install named methods by default', () => {
      installPlugin();

      expect(prototype.addComponent).toBeDefined();
      expect(prototype.removeComponent).toBeDefined();
      expect(prototype.getComponent).toBeDefined();
      expect(prototype.getComponents).toBeDefined();
      expect(prototype.getAllComponents).toBeDefined();

      uninstallPlugin();
    });

    it('should not install named methods if symbolsOnly is false', () => {
      installPlugin(true);

      expect(prototype.addComponent).not.toBeDefined();
      expect(prototype.removeComponent).not.toBeDefined();
      expect(prototype.getComponent).not.toBeDefined();
      expect(prototype.getComponents).not.toBeDefined();
      expect(prototype.getAllComponents).not.toBeDefined();

      uninstallPlugin();
    });
  });
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
});
