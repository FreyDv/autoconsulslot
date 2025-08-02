import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from '@modules/context/base/context.interceptor';
import { ContextService } from '@modules/context/base/context.service';
import { PlayerContextService } from '@modules/context/base/player-context.service';


@Global()
@Module({
  providers: [
    ContextService,
    PlayerContextService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
  ],
  exports: [PlayerContextService],
})
export class ContextModule {
}