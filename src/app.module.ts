import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
// import { CustomConfigModule } from './modules/config/config.module';
import { PlaywrightModule } from './modules/player-write/playwright.module';
import { TelegramModule } from './modules/telegram/telegram.module';

@Module({
  imports: [ PlaywrightModule, TelegramModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    }],
})
export class AppModule {
}
