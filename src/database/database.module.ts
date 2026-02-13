import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      location: 'data/users.db',
      autoSave: true,
      synchronize: true,
      entities: [__dirname + '/../**/*.orm-entity{.ts,.js}'],
    }),
  ],
})
export class DatabaseModule {}
