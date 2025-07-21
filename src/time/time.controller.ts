// src/time/time.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TimeService } from './time.service';

@Controller()
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  // Este método responderá a un mensaje con el patrón 'get_time'
  @MessagePattern('get_time')
  getTime(): string {
    console.log('Comando "get_time" recibido. Enviando la hora actual...');
    return this.timeService.getCurrentTime();
  }
}