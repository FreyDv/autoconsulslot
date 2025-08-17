import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramService {
  getWelcomeMessage(): string {
    return 'Привет! Я бот на Nest.js с nest-telegraf.';
  }

  echoMessage(text: string): string {
    return `Вітаю тебе мій юний друже: ${text}`;
  }
}