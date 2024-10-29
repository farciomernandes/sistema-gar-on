import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IDbDeleteUserRepository } from '@/core/domain/protocols/db/user/delete-user-repository';
import { IDbAddUserRepository } from '@/core/domain/protocols/db/user/add-user-repository';
import { IDbUpdateUserRepository } from '@/core/domain/protocols/db/user/update-user-repository';
import { DbListUser } from '@/core/application/user/db-list-user';
import { DbAddUser } from '@/core/application/user/db-add-user';
import { DbDeleteUser } from '@/core/application/user/db-delete-user';
import { DbUpdateUser } from '@/core/application/user/db-update-user';
import { User } from '@/core/domain/models/user.entity';
import { UserTypeOrmRepository } from '@/infra/db/typeorm/repositories/user-typeorm.repository';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { IDbListUserRepository } from '@/core/domain/protocols/db/user/list-user-respository';
import { IHasher } from '@/core/domain/protocols/cryptography/hasher';
import { BcryptAdapter } from '@/infra/adapters/bcrypt-adapter';
import { RoleRepository } from '@/core/domain/protocols/repositories/role';
import { RoleTypeOrmRepository } from '@/infra/db/typeorm/repositories/role-typeorm.repository';
import { Role } from '@/core/domain/models/role.entity';
import { DbFindUserById } from '@/core/application/user/db-find-user-by-id';
import { IDbFindUserByIdRepository } from '@/core/domain/protocols/db/user/find-user-by-id-repository';

export const userProvider: Provider[] = [
  DbAddUser,
  DbListUser,
  DbDeleteUser,
  DbUpdateUser,
  DbFindUserById,
  BcryptAdapter,
  {
    provide: UserTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new UserTypeOrmRepository(dataSource.getRepository(User));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: IHasher,
    useClass: BcryptAdapter,
  },
  {
    provide: UserRepository,
    useClass: UserTypeOrmRepository,
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
    provide: IDbAddUserRepository,
    useFactory: (
      userRepository: UserRepository,
      hasher: IHasher,
      roleRepository: RoleRepository,
    ): DbAddUser => {
      return new DbAddUser(userRepository, hasher, roleRepository);
    },
    inject: [UserTypeOrmRepository, BcryptAdapter, RoleTypeOrmRepository],
  },
  {
    provide: IDbListUserRepository,
    useFactory: (userRepository: UserRepository): DbListUser => {
      return new DbListUser(userRepository);
    },
    inject: [UserTypeOrmRepository],
  },
  {
    provide: IDbFindUserByIdRepository,
    useFactory: (userRepository: UserRepository): DbFindUserById => {
      return new DbFindUserById(userRepository);
    },
    inject: [UserTypeOrmRepository],
  },
  {
    provide: IDbUpdateUserRepository,
    useFactory: (
      userRepository: UserRepository,
      hasher: IHasher,
    ): DbUpdateUser => {
      return new DbUpdateUser(userRepository, hasher);
    },
    inject: [UserTypeOrmRepository, BcryptAdapter],
  },
  {
    provide: IDbDeleteUserRepository,
    useFactory: (userRepository: UserRepository): DbDeleteUser => {
      return new DbDeleteUser(userRepository);
    },
    inject: [UserTypeOrmRepository],
  },
];
