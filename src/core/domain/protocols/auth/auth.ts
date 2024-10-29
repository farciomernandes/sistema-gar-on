export abstract class IAuth {
  abstract auth(email: string, password: string): Promise<string>;
}
