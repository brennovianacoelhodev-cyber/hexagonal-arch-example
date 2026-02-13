import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserUsecase } from 'src/users/application/create-user.usecase';
import { ListUsersUsecase } from 'src/users/application/list-users.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly listUsersUsecase: ListUsersUsecase,
    private readonly createUserUsecase: CreateUserUsecase,
  ) {}

  @Get()
  async listUsers(): Promise<UserResponseDto[]> {
    const users = await this.listUsersUsecase.execute();
    return UserResponseDto.fromEntities(users);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUserUsecase.execute(
      dto.name,
      dto.email,
      dto.password,
      new Date(dto.birthDate),
    );
    return UserResponseDto.fromEntity(user);
  }
}
