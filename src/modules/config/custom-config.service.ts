import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_KEY, EnvironmentVariables } from './env.schema'; // define your types

@Injectable()
export class CustomConfigService {
  constructor(private readonly configService: ConfigService) {}

  getEnvVar(): EnvironmentVariables {
    return this.configService.getOrThrow<EnvironmentVariables>(ENV_KEY);
  }
}
