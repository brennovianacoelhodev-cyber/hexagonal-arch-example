import { Inject, Injectable } from '@nestjs/common';
import { LoggerPort } from 'src/ports/logger.port';
import { UserEntity } from '../domain/user.entity';
import { HasherPort } from '../ports/hasher.port';
import { UserRepositoryPort } from '../ports/user.repository.port';

@Injectable()
export class CreateUserUsecase {
  constructor(
    @Inject(UserRepositoryPort)
    private readonly userRepository: UserRepositoryPort,
    @Inject(HasherPort)
    private readonly hasher: HasherPort,
    @Inject(LoggerPort)
    private readonly logger: LoggerPort,
  ) {}

  async execute(
    name: string,
    email: string,
    password: string,
    birthDate: Date,
  ): Promise<UserEntity> {
    const hashedPassword = await this.hasher.hash(password);
    const user = UserEntity.create(name, email, hashedPassword, birthDate);
    const saved = await this.userRepository.create(user);

    this.logger.log(`User created: ${saved.email}`, 'CreateUserUsecase');

    return saved;
  }
}
