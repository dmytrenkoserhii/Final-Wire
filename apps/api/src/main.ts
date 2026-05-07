import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { config as loadDotenv } from 'dotenv';
import { NestFactory } from '@nestjs/core';

function loadEnvironment(): void {
  const cwd = process.cwd();
  const candidates = [
    resolve(cwd, '.env'),
    resolve(cwd, '../.env'),
    resolve(cwd, '../../.env'),
    resolve(cwd, 'apps/api/.env'),
    resolve(__dirname, '../.env'),
    resolve(__dirname, '../../.env'),
    resolve(__dirname, '../../../.env'),
  ];

  for (const filePath of new Set(candidates)) {
    if (existsSync(filePath)) {
      loadDotenv({ path: filePath });
    }
  }
}

async function bootstrap() {
  loadEnvironment();
  const { AppModule } = await import('./app.module.js');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
