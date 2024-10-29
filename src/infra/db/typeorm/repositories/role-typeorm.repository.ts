import { Repository } from 'typeorm';
import { Role } from '@/core/domain/models/role.entity';
import { RoleModel } from '@/presentation/dtos/role/role-model.dto';
import { RoleRepository } from '@/core/domain/protocols/repositories/role';

export class RoleTypeOrmRepository implements RoleRepository {
  constructor(private readonly roleRepository: Repository<Role>) {}

  async update(payload: Omit<RoleModel, 'id'>, id: string): Promise<Role> {
    try {
      const role = await this.roleRepository.findOneOrFail({
        where: { id },
      });

      this.roleRepository.merge(role, payload);
      return this.roleRepository.save(role);
    } catch (error) {
      throw new Error('Role not found');
    }
  }

  async findById(id: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }

  async findByValue(value: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { value } });
  }

  async getAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async create(payload: Omit<Role, 'id'>): Promise<Role> {
    const role = this.roleRepository.create(payload);
    return this.roleRepository.save(role);
  }
}
