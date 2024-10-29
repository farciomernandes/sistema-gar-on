import { IDbListRoleRepository } from '@/core/domain/protocols/db/role/list-role-respository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Role } from '@/core/domain/models/role.entity';
import { RoleRepository } from '@/core/domain/protocols/repositories/role';

@Injectable()
export class DbListRole implements IDbListRoleRepository {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAll(): Promise<Role[]> {
    try {
      return this.roleRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
