import { UserEntity } from 'src/users/domain/user.entity';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  birthDate: Date;

  static fromEntity(entity: UserEntity): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.birthDate = entity.birthDate;
    return dto;
  }

  static fromEntities(entities: UserEntity[]): UserResponseDto[] {
    return entities.map(UserResponseDto.fromEntity);
  }
}
