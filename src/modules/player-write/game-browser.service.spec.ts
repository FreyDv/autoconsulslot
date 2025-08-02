import { Test, TestingModule } from '@nestjs/testing';
import { GameBrowser } from './game-browser.service';
import { Browser, Page } from 'playwright';
import { PLAYWRIGHT_BROWSER } from './playwright.constants';

describe('GameBrowser', () => {
  let gameBrowser: GameBrowser;
  let mockBrowser: jest.Mocked<Browser>;
  let mockPage: jest.Mocked<Page>;

  beforeEach(async () => {
    mockPage = {
      goto: jest.fn(),
      screenshot: jest.fn(),
      close: jest.fn(),
    } as any;

    mockBrowser = {
      newPage: jest.fn().mockResolvedValue(mockPage),
      close: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameBrowser,
        {
          provide: PLAYWRIGHT_BROWSER,
          useValue: mockBrowser,
        },
      ],
    }).compile();

    gameBrowser = module.get(GameBrowser);
  });

  it('should open new page and go to URL', async () => {
    await gameBrowser.newGamePage('https://example.com');
    expect(mockBrowser.newPage).toHaveBeenCalled();
    expect(mockPage.goto).toHaveBeenCalledWith('https://example.com');
  });

  it('should take a screenshot', async () => {
    const buffer = Buffer.from('test');
    mockPage.screenshot.mockResolvedValue(buffer);

    await gameBrowser.newGamePage('https://example.com');
    const result = await gameBrowser.takeScreenshot();
    expect(result).toBe(buffer);
    expect(mockPage.screenshot).toHaveBeenCalledWith({ type: 'jpeg' });
  });

  it('should close the page', async () => {
    await gameBrowser.newGamePage('https://example.com');
    await gameBrowser.closePage();
    expect(mockPage.close).toHaveBeenCalled();
  });

  it('should close the browser on destroy', async () => {
    await gameBrowser.onModuleDestroy();
    expect(mockBrowser.close).toHaveBeenCalled();
  });
});