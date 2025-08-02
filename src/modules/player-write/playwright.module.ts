import { Global, Module } from '@nestjs/common';
import { browserProvider } from './playwright.providers';
import { GameBrowser } from './game-browser.service';

@Global()
@Module({
  providers: [
    browserProvider,
    GameBrowser,
  ],
  exports: [GameBrowser],
})
export class PlaywrightModule {
}