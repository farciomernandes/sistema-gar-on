import { EntitySchema } from 'typeorm';
import { User } from '@/core/domain/models/user.entity';

export const UserSchema = new EntitySchema<User>({
  name: User.name,
  target: User,
  tableName: 'users',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    email: {
      type: 'varchar',
      nullable: false,
    },
    password: {
      type: 'varchar',
      nullable: false,
    },
    name: {
      type: 'varchar',
      nullable: false,
    },
    cpf: {
      type: 'varchar',
      nullable: false,
    },
    document: {
      type: 'varchar',
      nullable: false,
    },
    sex: {
      type: 'varchar',
      nullable: false,
    },
    birthdate: {
      type: 'varchar',
      nullable: false,
    },
    phone: {
      type: 'varchar',
      nullable: false,
    },
    role_id: {
      type: 'uuid',
      nullable: true,
    },
  },
  relations: {
    role: {
      type: 'many-to-one',
      target: 'Role',
      joinColumn: { name: 'role_id' },
      eager: true,
    },
  },
});
