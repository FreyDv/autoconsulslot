import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const AppEnvironmentVariablesSchema = z.object({
  API_PORT: z.coerce.number().default(3000),
  OPENAI_API_KEY: z.string(),
});

export class AppEnvironmentVariables extends createZodDto(AppEnvironmentVariablesSchema) {
}

const PostgresEnvironmentVariablesSchema = z.object({
  POSTGRES_HOST: z.string().default('postgres'),
  POSTGRES_PORT: z.coerce.number().default(5432),
  POSTGRES_DB: z.string().default('bf'),
  POSTGRES_USER: z.string().default('bf'),
  POSTGRES_PASSWORD: z.string().default('bf'),
  DATABASE_URL: z.string(),
  POOL_SIZE: z.string().transform(ps => Number(ps)).default('5'),
});

export class PostgresEnvironmentVariables extends createZodDto(PostgresEnvironmentVariablesSchema) {
}

const MinioEnvironmentVariablesSchema = z.object({
  MINIO_BROWSER: z.string().default('on'),
  MINIO_HOST: z.string().default('minio'),
  MINIO_GUI_PORT: z.coerce.number().default(9001),
  MINIO_API_PORT: z.coerce.number().default(9000),
  MINIO_ROOT_USER: z.string().default('bfbf'),
  MINIO_ROOT_PASSWORD: z.string().default('bfbfbfbfbf'),
});

export class MinioEnvironmentVariables extends createZodDto(MinioEnvironmentVariablesSchema) {
}

export const EnvironmentVariablesSchema =
  AppEnvironmentVariablesSchema.merge(PostgresEnvironmentVariablesSchema).merge(MinioEnvironmentVariablesSchema);

// optional: forbid unknown keys

export class EnvironmentVariables extends createZodDto(EnvironmentVariablesSchema) {
}

export const ENV_KEY = 'ENV_KEY';
