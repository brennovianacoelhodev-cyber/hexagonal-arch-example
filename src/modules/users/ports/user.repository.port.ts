import { UserEntity } from '../domain/user.entity';

export abstract class UserRepositoryPort {
  abstract findAll(): Promise<UserEntity[]>;
  abstract create(user: UserEntity): Promise<UserEntity>;
}
