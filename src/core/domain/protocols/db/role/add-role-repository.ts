import { Role } from '@/core/domain/models/role.entity';
import { RoleModel } from '@/presentation/dtos/role/role-model.dto';

export abstract class IDbAddRoleRepository {
  abstract create(payload: Omit<RoleModel, 'id'>): Promise<Role>;
}
