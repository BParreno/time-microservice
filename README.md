# 🧑‍💻 Microservicio de la Hora (Servidor TCP)

Este proyecto implementa un microservicio simple que proporciona la hora actual a través de comunicación TCP. Actúa como el servidor en una interacción de microservicios, esperando peticiones de clientes para devolverles la hora.## 

**🚀 Tecnologías Utilizadas**

* **NestJS:** Un framework progresivo de Node.js, ideal para construir aplicaciones del lado del servidor escalables y eficientes.
* **TCP (Transmission Control Protocol):** El protocolo de comunicación base utilizado para la interacción con los microservicios clientes.##

**📡 Detalles del Microservicio**

* **Rol:** Servidor de la hora. Provee la funcionalidad de obtener la hora actual.
* **Dirección IP Local de la Máquina (Escucha en todas las interfaces):** `0.0.0.0` (incluye `localhost` y tu IP de red, por ejemplo, `192.168.20.68`)
* **Puerto de Escucha (Servidor TCP):** `3001`
* **Método de Comunicación:** Protocolo TCP de NestJS (Request-Response basado en patrones de mensaje).
* **Cliente de Ejemplo:** `client-microservice` (se conectará a este microservicio).##

**📦 Estructura Interna**

El microservicio está organizado con los siguientes componentes clave:

* **`src/main.ts`:** Configura la aplicación NestJS para que funcione como un microservicio TCP, escuchando en el puerto `3001`.
* **`src/app.module.ts`:** Módulo raíz que importa `TimeModule`.
* **`src/time/time.module.ts`:** Encapsula la lógica relacionada con la hora, declarando `TimeController` y `TimeService`.
* **`src/time/time.service.ts`:** Contiene la lógica de negocio para obtener la hora actual del sistema.
* **`src/time/time.controller.ts`:** Define el patrón de mensaje TCP que este microservicio escuchará (`get_time`) y delega la lógica a `TimeService`.##

**⚙️ Funcionalidades Expuestas (Patrones de Mensaje TCP)**

Este microservicio expone sus funcionalidades a través del siguiente patrón de mensaje TCP. Los clientes deben enviar mensajes con el cmd especificado.

| `cmd`       | Descripción                          | Payload Esperado (`data`) | Retorno (`Promise<...`) |
| :---------- | :----------------------------------- | :------------------------ | :---------------------- |
| `get_time`  | Obtiene la hora actual del servidor. | `{}` (Objeto vacío)      | `string` (ej. `"14:35:01"`) |

## 🚀 Cómo Poner en Marcha el Microservicio

Sigue estos pasos para configurar y ejecutar el microservicio de la hora en tu entorno de desarrollo.

**Prerrequisitos**

Asegúrate de tener instalados los siguientes componentes:

* Node.js (versión 16.x o superior recomendada) y npm
* NestJS CLI (instalado globalmente: npm i -g @nestjs/cli)

**Configuración del Entorno**

* Crear el Proyecto NestJS:
  Abre tu terminal y ejecuta:

  ```bash
  nest new time-microservice