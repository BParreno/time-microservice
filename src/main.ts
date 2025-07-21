// src/main.ts
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // Crea la aplicación como un microservicio TCP
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0', // Escucha en todas las interfaces de red disponibles
      port: 3001,      // Puerto donde el microservicio de la hora escuchará
    },
  });
  await app.listen();
  console.log('Microservicio de la Hora escuchando en el puerto 3001');
}
bootstrap();