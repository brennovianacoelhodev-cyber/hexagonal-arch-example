import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/users/domain/user.entity';
import { UserRepositoryPort } from 'src/modules/users/ports/user.repository.port';
import { UserOrmEntity } from './orm-entity/user.orm-entity';

@Injectable()
export class UserRepositoryImpl extends UserRepositoryPort {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {
    super();
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users.map(
      (u) => new UserEntity(u.id, u.name, u.email, u.password, u.birthDate),
    );
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const ormEntity = this.userRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
      birthDate: user.birthDate,
    });
    const saved = await this.userRepository.save(ormEntity);
    return new UserEntity(
      saved.id,
      saved.name,
      saved.email,
      saved.password,
      saved.birthDate,
    );
  }
}
