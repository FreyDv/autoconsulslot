import { Injectable } from '@nestjs/common';
import { EnvironmentVariables } from './modules/config/env.schema';

@Injectable()
export class AppService {
  constructor() {
  }

  async getHello(): Promise<void> {

    // const consulURL = 'https://canada.mfa.gov.ua/konsulski-pitannya/zapis-na-konsulskij-prijom';
    // await this.browser.newGamePage(consulURL);
    // await this.browser.passAdd();

    // return this.configService.getEnvVar();
  }
}
