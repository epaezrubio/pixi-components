import { describe, expect, it } from 'vitest';

import { installPlugin, isInstalled, uninstallPlugin } from '../../src/plugin';

describe('isInstalled', () => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  describe('DisplayObject prototype', () => {
    it('should return false before installing', () => {
      expect(isInstalled()).toBe(false);
    });

    it('should return true after installing', () => {
      installPlugin();

      expect(isInstalled()).toBe(true);

      uninstallPlugin();
    });

    it('should return false after unstalling', () => {
      installPlugin();
      uninstallPlugin();

      expect(isInstalled()).toBe(false);
    });
  });
});
