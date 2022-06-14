import type { InlineConfig } from 'vitest';

const test: InlineConfig = {
  deps: {
    inline: ['@pixi/polyfill'],
  },
  coverage: {
    enabled: true,
    reporter: ['cobertura', 'text'],
    reportsDirectory: 'coverage',
  },
};

export default {
  test,
};
