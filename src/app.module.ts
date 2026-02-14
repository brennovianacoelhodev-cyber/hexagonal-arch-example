import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { PinoLoggerAdapter } from './common/adapters/pino-logger.adapter';
import { DatabaseModule } from './database/database.module';
import { LoggerPort } from './ports/logger.port';
import { UsersModule } from './users/users.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRootAsync({
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
              req: (req) => ({
                method: req.method,
                url: req.url,
              }),
              res: (res) => ({
                statusCode: res.statusCode,
              }),
            },
          },
        };
      },
    }),
    DatabaseModule,
    UsersModule,
  ],
  providers: [
    {
      provide: LoggerPort,
      useClass: PinoLoggerAdapter,
    },
  ],
  exports: [LoggerPort],
})
export class AppModule {}
