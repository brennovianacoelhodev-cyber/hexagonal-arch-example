import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './adapters/in/http/user.controller';
import { UserOrmEntity } from './adapters/out/database/orm-entity/user.orm-entity';
import { BcryptHasherAdapter } from './adapters/out/hasher/bcrypt-hasher.adapter';
import { UserRepositoryImpl } from './adapters/out/database/user.repository.impl';
import { CreateUserUsecase } from './application/create-user.usecase';
import { ListUsersUsecase } from './application/list-users.usecase';
import { HasherPort } from './ports/hasher.port';
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
    {
      provide: HasherPort,
      useClass: BcryptHasherAdapter,
    },
  ],
})
export class UsersModule {}
