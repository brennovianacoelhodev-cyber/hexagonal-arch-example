import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/user.entity';
import { UserRepositoryPort } from '../ports/user.repository.port';

@Injectable()
export class ListUsersUsecase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  execute(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }
}
