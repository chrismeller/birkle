import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(await app.resolve('LoggerService'));

  await app.listen(30000);
}
bootstrap();
