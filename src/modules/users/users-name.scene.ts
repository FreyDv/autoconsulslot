import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/scenes';


enum SceneList {
  USER_NAME= 'user-name',
}

@Scene(SceneList.USER_NAME)
export class UsersNameScene {

  @SceneEnter()
  async enter(@Ctx() context: SceneContext) {
    context.reply('2+2 = ?', {
      reply_markup: {
        inline_keyboard: [
          [{text: 'Может быть 4?', callback_data: '4'}],
          [{text: 'Точно пять!', callback_data: '5'}],
        ],
      },
    });
  }
}
