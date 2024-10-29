export abstract class IDbDeleteUserRepository {
  abstract delete(id: string): Promise<void>;
}
