import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Browser, Page } from 'playwright';
import { PLAYWRIGHT_BROWSER } from './playwright.constants';

@Injectable()
export class GameBrowser implements OnModuleDestroy {
  private page: Page;

  constructor(
    @Inject(PLAYWRIGHT_BROWSER)
    private readonly browser: Browser,
  ) {
  }

  async newGamePage(url: string): Promise<void> {
    this.page = await this.browser.newPage();
    await this.page.goto(url);
  }

  async takeScreenshot(): Promise<Buffer> {
    return this.page.screenshot({ type: 'jpeg' });
  }

  async closePage(): Promise<void> {
    await this.page?.close();
  }

  /** ensure browser is closed when Nest shuts down */
  async onModuleDestroy() {
    await this.browser.close();
  }


  async passAdd() {
    await this.page.click('//a[@href=\'https://id.e-consul.gov.ua/\']');

    console.log();

  }
}