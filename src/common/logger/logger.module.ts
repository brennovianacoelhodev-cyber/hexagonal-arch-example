import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule as PinoModule } from 'nestjs-pino';
import { LoggerPort } from './logger.port';
import { PinoLoggerAdapter } from './pino-logger.adapter';

@Global()
@Module({
  imports: [
    PinoModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isDev = config.get('NODE_ENV') !== 'production';

        return {
          pinoHttp: {
            level: isDev ? 'debug' : 'info',
            ...(isDev && {
              transport: {
                target: 'pino-pretty',
                options: { colorize: true, singleLine: true },
              },
            }),
            serializers: {
              req: (req: Request) => ({
                method: req.method,
                url: req.url,
              }),
              res: (res: Record<string, unknown>) => ({
                statusCode: res.statusCode,
              }),
            },
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: LoggerPort,
      useClass: PinoLoggerAdapter,
    },
  ],
  exports: [LoggerPort],
})
export class LoggerModule {}
