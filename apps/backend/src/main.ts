import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Дозволяємо Render задавати свій порт
  const port = process.env.PORT || 3000;
  // Слухаємо всі інтерфейси (0.0.0.0), це обов'язкова умова для хмарних хостингів
  await app.listen(port, '0.0.0.0');
}
bootstrap();
