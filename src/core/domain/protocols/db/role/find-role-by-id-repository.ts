import { Role } from '@/core/domain/models/role.entity';

export abstract class IDbFindRoleByIdRepository {
  abstract findById(id: string): Promise<Role>;
}
