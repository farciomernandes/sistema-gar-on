import { Role } from '@/core/domain/models/role.entity';

export abstract class IDbFindRoleByValueRepository {
  abstract findByValue(value: string): Promise<Role>;
}
