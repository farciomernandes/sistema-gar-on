export abstract class IDbDeleteProductVariablesRepository {
  abstract delete(id: string): Promise<void>;
}
