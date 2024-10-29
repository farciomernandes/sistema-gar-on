import { RoleModel } from '@/presentation/dtos/role/role-model.dto';

export abstract class IRoleSeed {
  abstract seedRoles(): Promise<RoleModel[]>;
}
