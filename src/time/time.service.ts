// src/time/time.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeService {
  // Método para obtener la hora actual
  getCurrentTime(): string {
    const now = new Date();
    return now.toLocaleString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Formato 24 horas
    });
  }
}