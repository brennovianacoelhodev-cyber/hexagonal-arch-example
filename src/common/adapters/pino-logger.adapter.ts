import { Injectable } from '@nestjs/common';
import pino from 'pino';
import { LoggerPort } from 'src/ports/logger.port';

@Injectable()
export class PinoLoggerAdapter extends LoggerPort {
  private readonly pino = pino({
    transport: {
      target: 'pino-pretty',
      options: { colorize: true, singleLine: true },
    },
  });

  log(message: string, context?: string): void {
    this.pino.info({ context }, message);
  }

  error(message: string, trace?: string, context?: string): void {
    this.pino.error({ context, trace }, message);
  }

  warn(message: string, context?: string): void {
    this.pino.warn({ context }, message);
  }
}
