import { PLAYWRIGHT_BROWSER } from './playwright.constants';

describe('playwright.constants', () => {
  it('should define PLAYWRIGHT_BROWSER correctly', () => {
    expect(PLAYWRIGHT_BROWSER).toBe('PLAYWRIGHT_BROWSER');
  });
});