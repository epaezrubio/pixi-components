import { DisplayObject } from 'pixi.js';
import { describe, expect, it } from 'vitest';

import { installPlugin, uninstallPlugin } from '../../src/plugin';
import {
  addComponent as addComponentSymbol,
  removeComponent as removeComponentSymbol,
  getComponent as getComponentSymbol,
  getComponents as getComponentsSymbol,
  getAllComponents as getAllComponentsSymbol,
} from '../../src/plugin/symbols';

describe('uninstallPlugin', () => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  describe('DisplayObject prototype', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    const prototype = DisplayObject.prototype as any;

    it('should remove symbol methods', () => {
      installPlugin();
      uninstallPlugin();

      expect(prototype[addComponentSymbol]).not.toBeDefined();
      expect(prototype[removeComponentSymbol]).not.toBeDefined();
      expect(prototype[getComponentSymbol]).not.toBeDefined();
      expect(prototype[getComponentsSymbol]).not.toBeDefined();
      expect(prototype[getAllComponentsSymbol]).not.toBeDefined();
    });

    it('should remove named methods', () => {
      installPlugin();
      uninstallPlugin();

      expect(prototype.addComponent).not.toBeDefined();
      expect(prototype.removeComponent).not.toBeDefined();
      expect(prototype.getComponent).not.toBeDefined();
      expect(prototype.getComponents).not.toBeDefined();
      expect(prototype.getAllComponents).not.toBeDefined();
    });
  });
  /* eslint-enable @typescript-eslint/no-unsafe-assignment */
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
});
