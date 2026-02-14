export abstract class HasherPort {
  abstract hash(value: string): Promise<string>;
}
