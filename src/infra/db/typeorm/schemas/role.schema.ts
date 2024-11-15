import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { Role } from '@/core/domain/models/role.entity';

export const RoleSchema = new EntitySchema<Role>({
  name: Role.name,
  target: Role,
  tableName: 'roles',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    value: {
      type: 'varchar',
      nullable: false,
    },
    label: {
      type: 'varchar',
      nullable: false,
    },
  },
});
