import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbAddRoleRepository } from '@/core/domain/protocols/db/role/add-role-repository';
import { Role } from '@/core/domain/models/role.entity';
import { RoleRepository } from '@/core/domain/protocols/repositories/role';

@Injectable()
export class DbAddRole implements IDbAddRoleRepository {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(payload: Omit<Role, 'id'>): Promise<Role> {
    try {
      const alreadyExists = await this.roleRepository.findByValue(
        payload.value,
      );

      if (alreadyExists && alreadyExists.id) {
        throw new BadRequestException(
          `Already exists a role with ${payload.value} value.`,
        );
      }
      const role = await this.roleRepository.create(payload);

      return role;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
