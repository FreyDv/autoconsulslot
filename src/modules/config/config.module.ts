import * as process from 'node:process';
import { join, resolve } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CustomConfigService } from './custom-config.service';
import { EnvironmentVariablesSchema } from './env.schema';

/**
 * **CustomConfigModule**
 *
 * A custom config module that retrieve environment variables from:
 * * [.env](.env)
 * * [./infra/minio/.env](./infra/minio/.env)
 * * [./infra/postgres/.env](./infra/postgres/.env)
 *
 * Then validate with {@link EnvironmentVariablesSchema}
 *
 * And provide {@link CustomConfigService} that could be used as on
 * @example
 * ```ts
 *  import { Injectable } from '@nestjs/common';
 *  import { CustomConfigService } from './config/custom-config.service';
 *  import { EnvironmentVariables } from './config/env.schema';
 *
 *  @Injectable()
 *  export class EnvRequiredExampleService {
 *    constructor(private readonly configService: CustomConfigService) {}
 *
 *    getEnv(): EnvironmentVariables {
 *      return this.configService.getEnvVar();
 *    }
 *  }
 * ```
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      skipProcessEnv: true,
      validate: (env) => ({ ENV_KEY: EnvironmentVariablesSchema.parse(env) }),
      envFilePath: [
        resolve(join(process.cwd(), '.env')),
        resolve(join(process.cwd(), 'infra', 'minio', '.env')),
        resolve(join(process.cwd(), 'infra', 'postgres', '.env')),
      ],
    }),
  ],
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class CustomConfigModule {}
