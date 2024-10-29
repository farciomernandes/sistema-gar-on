import { Role } from '@/core/domain/models/role.entity';

export abstract class IDbListRoleRepository {
  abstract getAll(): Promise<Role[]>;
}
