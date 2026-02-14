import { UserUnderageException } from './exceptions/user-underage.exception';

export class UserEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly birthDate: Date,
  ) {}

  static create(
    name: string,
    email: string,
    password: string,
    birthDate: Date,
  ): UserEntity {
    if (UserEntity.calculateAge(birthDate) < 18) {
      throw new UserUnderageException();
    }

    return new UserEntity(0, name, email, password, birthDate);
  }

  private static calculateAge(birthDate: Date): number {
    const diffMs = Date.now() - birthDate.getTime();
    return Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
  }
}
