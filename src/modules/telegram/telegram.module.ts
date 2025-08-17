import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUpdate } from './telegram.update';
import { TelegramService } from './telegram.service';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: "8491783046:AAFiE-3GKdSKDd4OYsi7dwUGJLK4BOnKXd8"
    }),
  ],
  providers: [TelegramUpdate, TelegramService],
})
export class TelegramModule {}