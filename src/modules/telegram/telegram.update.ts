import { Context, Telegraf } from 'telegraf';
import { TelegramService } from './telegram.service';
import { Action, Command, Ctx, InjectBot, Message, On, Start, Update } from 'nestjs-telegraf';

@Update()
export class TelegramUpdate {
  constructor(private readonly telegramService: TelegramService, @InjectBot() private readonly bot: Telegraf<Context>) {
    this.initTelegrafCommands()
  }

  initTelegrafCommands(){
    this.bot.telegram.setMyCommands([
      { command: 'start', description: 'Запустить бота' },
      { command: 'help', description: 'Помощь' },
      { command: 'info', description: 'Информация о боте' },
    ])
  }

  @Start()
  async start(@Ctx() ctx: Context) {
    const firstName = `${ctx.message?.from.first_name}, ${ctx.message?.from.id}` || 'друг';
    await ctx.reply(`Привет ${firstName}! Выбери пункт меню:`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Загрузить данные о себе', callback_data: 'download_data' },
            { text: 'Начать поиск свободных слотов', callback_data: 'research_slots' },
          ]
        ],
      },
    });
  }

  @Action('download_data')
  async handleBtn1(@Ctx() ctx: Context) {
    await ctx.answerCbQuery();
    await ctx.reply('Вы нажали Кнопку 1');
  }

  @Action('research_slots')
  async handleBtn2(@Ctx() ctx: Context) {
    await ctx.answerCbQuery();
    await ctx.reply('Вы нажали Кнопку 2');
  }

  @Command('help')
  async help(@Ctx() ctx: Context) {
    await ctx.reply('Список доступных команд:\n/start - запустить бота\n/info - информация');
  }

  @Command('info')
  async info(@Ctx() ctx: Context) {
    await ctx.reply('Команда info');
  }

 @On('text')
  async onMessage(@Message("text") reversedText: string, @Ctx() ctx: Context) {
    const reply = this.telegramService.echoMessage(`id: ${ctx.message?.from.id.toString()}, name: ${ctx.message?.from.username}` || "нет ответа");
    console.log(reversedText)
    await ctx.reply(reply);
  }

}

