import { Injectable } from '@nestjs/common';
import { Role } from '@/core/domain/models/role.entity';
import { RoleModel } from '@/presentation/dtos/role/role-model.dto';
import { IDbAddRoleRepository } from '../db/role/add-role-repository';
import { IDbListRoleRepository } from '../db/role/list-role-respository';
import { IDbFindRoleByIdRepository } from '../db/role/find-role-by-id-repository';
import { IDbFindRoleByValueRepository } from '../db/role/find-role-by-value-repository';
import { IDbUpdateRoleRepository } from '../db/role/update-role-repository';
import { IDbDeleteRoleRepository } from '../db/role/delete-role-repository';
@Injectable()
export abstract class RoleRepository
  implements
    IDbAddRoleRepository,
    IDbListRoleRepository,
    IDbFindRoleByIdRepository,
    IDbFindRoleByValueRepository,
    IDbUpdateRoleRepository,
    IDbDeleteRoleRepository
{
  abstract findByValue(value: string): Promise<Role>;
  abstract findById(id: string): Promise<Role>;
  abstract getAll(): Promise<Role[]>;
  abstract create(payload: Omit<RoleModel, 'id'>): Promise<Role>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: Omit<RoleModel, 'id'>, id: string): Promise<Role>;
}
