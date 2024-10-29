import { RoleModel } from '@/presentation/dtos/role/role-model.dto';
import { Role } from '@/core/domain/models/role.entity';

export abstract class IDbUpdateRoleRepository {
  abstract update(payload: Omit<RoleModel, 'id'>, id: string): Promise<Role>;
}
