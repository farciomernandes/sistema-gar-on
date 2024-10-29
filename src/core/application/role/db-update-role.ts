import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateRoleRepository } from '@/core/domain/protocols/db/role/update-role-repository';
import { RoleModel } from '@/presentation/dtos/role/role-model.dto';
import { Role } from '@/core/domain/models/role.entity';
import { RoleRepository } from '@/core/domain/protocols/repositories/role';

@Injectable()
export class DbUpdateRole implements IDbUpdateRoleRepository {
  constructor(private readonly roleRepository: RoleRepository) {}

  async update(payload: Omit<RoleModel, 'id'>, id: string): Promise<Role> {
    try {
      return await this.roleRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'Role not found') {
        throw new BadRequestException(`Role not found`);
      } else {
        throw error;
      }
    }
  }
}
