import { PLAYWRIGHT_BROWSER } from './playwright.constants';
import { browserProvider } from './playwright.providers';
import { Browser, chromium } from 'playwright';
import { FactoryProvider } from '@nestjs/common';

jest.mock('playwright', () => ({
  chromium: {
    launch: jest.fn(),
  },
}));

describe('browserProvider', () => {
  it('should call chromium.launch with headless false', async () => {
    const mockBrowser = {} as Browser;
    (chromium.launch as jest.Mock).mockResolvedValue(mockBrowser);

    const browser = await (browserProvider as FactoryProvider).useFactory();
    expect(chromium.launch).toHaveBeenCalledWith({ headless: false });
    expect(browser).toBe(mockBrowser);
  });

  it('should use PLAYWRIGHT_BROWSER as the provide token', () => {
    expect((browserProvider as FactoryProvider).provide).toBe(PLAYWRIGHT_BROWSER);
  });
});