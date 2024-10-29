export abstract class IDbDeleteRoleRepository {
  abstract delete(id: string): Promise<void>;
}
