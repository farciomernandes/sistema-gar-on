import { Module } from '@nestjs/common';
import { IDbAddRoleRepository } from '@/core/domain/protocols/db/role/add-role-repository';
import { IDbListRoleRepository } from '@/core/domain/protocols/db/role/list-role-respository';
import { RoleController } from '@/presentation/controllers/role/role-controller';
import { roleProvider } from './role.provider';
import { IDbDeleteRoleRepository } from '@/core/domain/protocols/db/role/delete-role-repository';
import { IDbUpdateRoleRepository } from '@/core/domain/protocols/db/role/update-role-repository';
import { RoleRepository } from '@/core/domain/protocols/repositories/role';
import { IRoleSeed } from '@/core/domain/protocols/db/role/seed-role';

@Module({
  imports: [],
  providers: [...roleProvider],
  controllers: [RoleController],
  exports: [
    IDbAddRoleRepository,
    IDbListRoleRepository,
    IDbDeleteRoleRepository,
    IDbUpdateRoleRepository,
    RoleRepository,
    IRoleSeed,
  ],
})
export class RoleModule {}
