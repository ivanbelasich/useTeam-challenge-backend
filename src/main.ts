import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: [
      'ngrok-skip-browser-warning',
      'Content-Type',
      'Authorization',
      'Accept',
    ],
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  return app;
}

export default bootstrap();
