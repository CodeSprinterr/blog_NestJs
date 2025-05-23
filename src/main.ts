import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.enableCors({
    origin: configService.get<string>('FRONTEND_ORIGIN'),
    credentials: true,
  });

  await app.listen(configService.get<number>('PORT') || 3000);
}
bootstrap();
