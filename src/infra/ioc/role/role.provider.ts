import { Provider } from '@nestjs/common';
import { DbAddRole } from '@/core/application/role/db-add-role';
import { DbListRole } from '@/core/application/role/db-list-role';
import { RoleTypeOrmRepository } from '../../db/typeorm/repositories/role-typeorm.repository';
import { Role } from '@/core/domain/models/role.entity';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DbDeleteRole } from '@/core/application/role/db-delete-role';
import { IDbDeleteRoleRepository } from '@/core/domain/protocols/db/role/delete-role-repository';
import { IDbAddRoleRepository } from '@/core/domain/protocols/db/role/add-role-repository';
import { IDbListRoleRepository } from '@/core/domain/protocols/db/role/list-role-respository';
import { DbUpdateRole } from '@/core/application/role/db-update-role';
import { IDbUpdateRoleRepository } from '@/core/domain/protocols/db/role/update-role-repository';
import { RoleRepository } from '@/core/domain/protocols/repositories/role';
import { RoleSeed } from '@/infra/db/typeorm/seeds/roles.seeds';
import { IRoleSeed } from '@/core/domain/protocols/db/role/seed-role';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { UserTypeOrmRepository } from '@/infra/db/typeorm/repositories/user-typeorm.repository';
import { User } from '@/core/domain/models/user.entity';

export const roleProvider: Provider[] = [
  DbAddRole,
  DbListRole,
  DbDeleteRole,
  DbUpdateRole,
  RoleSeed,
  {
    provide: UserTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new UserTypeOrmRepository(dataSource.getRepository(User));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: UserRepository,
    useClass: UserTypeOrmRepository,
  },
  {
    provide: IRoleSeed,
    useFactory: (roleRepository: RoleRepository, userRepository: UserRepository): RoleSeed => {
      return new RoleSeed(roleRepository, userRepository);
    },
    inject: [RoleTypeOrmRepository, UserTypeOrmRepository],
  },
  {
    provide: RoleTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new RoleTypeOrmRepository(dataSource.getRepository(Role));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: RoleRepository,
    useClass: RoleTypeOrmRepository,
  },
  {
    provide: IDbAddRoleRepository,
    useFactory: (roleRepository: RoleRepository): DbAddRole => {
      return new DbAddRole(roleRepository);
    },
    inject: [RoleTypeOrmRepository],
  },
  {
    provide: IDbListRoleRepository,
    useFactory: (roleRepository: RoleRepository): DbListRole => {
      return new DbListRole(roleRepository);
    },
    inject: [RoleTypeOrmRepository],
  },
  {
    provide: IDbUpdateRoleRepository,
    useFactory: (roleRepository: RoleRepository): DbUpdateRole => {
      return new DbUpdateRole(roleRepository);
    },
    inject: [RoleTypeOrmRepository],
  },
  {
    provide: IDbDeleteRoleRepository,
    useFactory: (roleRepository: RoleRepository): DbDeleteRole => {
      return new DbDeleteRole(roleRepository);
    },
    inject: [RoleTypeOrmRepository],
  },
];
