import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://frontend-app-a3yc.onrender.com',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
