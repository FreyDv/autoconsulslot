import { Test, TestingModule } from '@nestjs/testing';
import { PlaywrightModule } from './playwright.module';
import { GameBrowser } from './game-browser.service';
import { PLAYWRIGHT_BROWSER } from './playwright.constants';

describe('PlaywrightModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [PlaywrightModule],
    }).compile();
  });

  it('should provide GameBrowser service', () => {
    const gameBrowser = module.get<GameBrowser>(GameBrowser);
    expect(gameBrowser).toBeInstanceOf(GameBrowser);
  });

  it('should provide PLAYWRIGHT_BROWSER token', () => {
    const browser = module.get(PLAYWRIGHT_BROWSER);
    expect(browser).toBeDefined();
  });
});
