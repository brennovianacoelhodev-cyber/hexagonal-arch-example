import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/user.entity';
import { UserRepositoryPort } from '../ports/user.repository.port';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  execute(
    name: string,
    email: string,
    password: string,
    birthDate: Date,
  ): Promise<UserEntity> {
    const user = UserEntity.create(name, email, password, birthDate);
    return this.userRepository.create(user);
  }
}
