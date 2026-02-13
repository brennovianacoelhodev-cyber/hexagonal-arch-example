import { DomainException } from "src/exceptions/domain.exception";

export class UserUnderageException extends DomainException {
  constructor() {
    super('User must be at least 18 years old');
  }
}
