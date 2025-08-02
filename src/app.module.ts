import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { CustomConfigModule } from './modules/config/config.module';
import { ContextModule } from './modules/context/base/context.module';
import { PlaywrightModule } from './modules/player-write/playwright.module';

@Module({
  imports: [CustomConfigModule, ContextModule, PlaywrightModule,
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
