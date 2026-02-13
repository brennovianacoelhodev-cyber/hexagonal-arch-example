import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './adapters/in/http/user.controller';
import { UserOrmEntity } from './adapters/out/database/orm-entity/user.orm-entity';
import { UserRepositoryImpl } from './adapters/out/database/user.repository.impl';
import { CreateUserUsecase } from './application/create-user.usecase';
import { ListUsersUsecase } from './application/list-users.usecase';
import { UserRepositoryPort } from './ports/user.repository.port';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
  providers: [
    ListUsersUsecase,
    CreateUserUsecase,
    {
      provide: UserRepositoryPort,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UsersModule {}
