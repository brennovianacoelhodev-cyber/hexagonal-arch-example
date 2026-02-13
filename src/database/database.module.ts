import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: config.get<string>('DB_TYPE', 'sqljs') as any,
        location: config.get<string>('DB_LOCATION', 'data/users.db'),
        autoSave: true,
        synchronize: true,
        entities: [__dirname + '/../**/*.orm-entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
