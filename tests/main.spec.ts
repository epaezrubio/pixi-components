import { describe, expect, it } from 'vitest';

describe('test runner', () => {
  it.concurrent('should run', () => {
    expect(true).toBeTruthy();
  });
});
