import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HasherPort } from 'src/modules/users/ports/hasher.port';

@Injectable()
export class BcryptHasherAdapter extends HasherPort {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }
}
