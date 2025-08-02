import { Injectable } from '@nestjs/common';
import { CustomConfigService } from './modules/config/custom-config.service';
import { EnvironmentVariables } from './modules/config/env.schema';

@Injectable()
export class AppService {
  constructor(private readonly configService: CustomConfigService, ) {
  }

  async getHello(): Promise<EnvironmentVariables> {

    const consulURL = 'https://canada.mfa.gov.ua/konsulski-pitannya/zapis-na-konsulskij-prijom';
    await this.browser.newGamePage(consulURL);
    await this.browser.passAdd();

    return this.configService.getEnvVar();
  }
}
