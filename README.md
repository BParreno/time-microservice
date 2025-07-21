🧑‍💻 Microservicio de la Hora (Servidor TCP)
Este proyecto implementa un microservicio simple que proporciona la hora actual a través de comunicación TCP. Actúa como el servidor en una interacción de microservicios, esperando peticiones de clientes para devolverles la hora.

🚀 Tecnologías Utilizadas
NestJS: Un framework progresivo de Node.js, ideal para construir aplicaciones del lado del servidor escalables y eficientes.

TCP (Transmission Control Protocol): El protocolo de comunicación base utilizado para la interacción con los microservicios clientes.

📡 Detalles del Microservicio
Rol: Servidor de la hora. Provee la funcionalidad de obtener la hora actual.

Dirección IP Local de la Máquina (Escucha en todas las interfaces): 0.0.0.0 (incluye localhost y tu IP de red, por ejemplo, 192.168.20.68)

Puerto de Escucha (Servidor TCP): 3001

Método de Comunicación: Protocolo TCP de NestJS (Request-Response basado en patrones de mensaje).

Cliente de Ejemplo: client-microservice (se conectará a este microservicio).

📦 Estructura Interna
El microservicio está organizado con los siguientes componentes clave:

src/main.ts: Configura la aplicación NestJS para que funcione como un microservicio TCP, escuchando en el puerto 3001.

src/app.module.ts: Módulo raíz que importa TimeModule.

src/time/time.module.ts: Encapsula la lógica relacionada con la hora, declarando TimeController y TimeService.

src/time/time.service.ts: Contiene la lógica de negocio para obtener la hora actual del sistema.

src/time/time.controller.ts: Define el patrón de mensaje TCP que este microservicio escuchará (get_time) y delega la lógica a TimeService.

⚙️ Funcionalidades Expuestas (Patrones de Mensaje TCP)
Este microservicio expone sus funcionalidades a través del siguiente patrón de mensaje TCP. Los clientes deben enviar mensajes con el cmd especificado.

cmd

Descripción

Payload Esperado (data)

Retorno (Promise<...)

get_time

Obtiene la hora actual del servidor.

{} (Objeto vacío)

string (ej. "14:35:01")

🚀 Cómo Poner en Marcha el Microservicio
Sigue estos pasos para configurar y ejecutar el microservicio de la hora en tu entorno de desarrollo.

Prerrequisitos
Asegúrate de tener instalados los siguientes componentes:

Node.js (versión 16.x o superior recomendada) y npm

NestJS CLI (instalado globalmente: npm i -g @nestjs/cli)

Configuración del Entorno
Crear el Proyecto NestJS:
Abre tu terminal y ejecuta:

nest new time-microservice

Navega al directorio del proyecto:

cd time-microservice

Instalar Dependencias del Proyecto:

npm install @nestjs/microservices

Configurar src/main.ts:
Abre el archivo src/main.ts y reemplaza su contenido con la configuración del servidor TCP:

// src/main.ts
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,
    },
  });
  await app.listen();
  console.log('Microservicio de la Hora escuchando en el puerto 3001');
}
bootstrap();

Generar el Recurso time:
En la terminal, ejecuta:

nest generate resource time

Cuando te pregunte "¿What transport would you like to use?", selecciona "Microservice".
Cuando te pregunte "¿Would you like to generate CRUD entry points?", selecciona "No".

Modificar src/time/time.service.ts:
Abre este archivo y añade la lógica para obtener la hora:

// src/time/time.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeService {
  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }
}

Modificar src/time/time.controller.ts:
Abre este archivo y define el patrón de mensaje get_time:

// src/time/time.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TimeService } from './time.service';

@Controller()
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @MessagePattern('get_time')
  getTime(): string {
    console.log('Comando "get_time" recibido. Enviando la hora actual...');
    return this.timeService.getCurrentTime();
  }
}

Verificar y Ajustar src/app.module.ts:
Asegúrate de que src/app.module.ts importe TimeModule y no tenga controladores o proveedores innecesarios:

// src/app.module.ts
import { Module } from '@nestjs/common';
import { TimeModule } from './time/time.module';

@Module({
  imports: [TimeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

Iniciar el Microservicio
Una vez configurado todo lo anterior, para levantar el microservicio de la hora:

npm run start:dev

Deberías ver un mensaje en tu consola indicando que el microservicio está escuchando en el puerto 3001. Deja esta terminal abierta.

🧪 Cómo Probar el Funcionamiento
Este microservicio se prueba enviándole un comando TCP desde un cliente. Para una prueba completa, necesitarás el client-microservice (descrito en su propio README).

Una vez que el client-microservice esté configurado y corriendo, al ejecutarlo, verás en la consola de este time-microservice el mensaje:

Comando "get_time" recibido. Enviando la hora actual...
