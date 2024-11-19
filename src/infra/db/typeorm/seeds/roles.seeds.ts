import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@/core/domain/protocols/repositories/role';
import { RoleModel } from '@/presentation/dtos/role/role-model.dto';
import { AddRole } from '@/presentation/dtos/role/add-role.dto';
import { IRoleSeed } from '@/core/domain/protocols/db/role/seed-role';
import { UserRepository } from '@/core/domain/protocols/repositories/user';

@Injectable()
export class RoleSeed implements IRoleSeed {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userRepository: UserRepository
  ) {}

  async seedRoles(): Promise<RoleModel[]> {
    const resultRoles: RoleModel[] = [];
    const roles: AddRole[] = [
      {
        label: 'Acesso geral ao sistema.',
        value: 'ADMIN',
      },
      {
        label: 'Acesso de usuário.',
        value: 'CUSTOMER',
      },
    ];
    for (const role of roles) {
      const alreadyExists = await this.roleRepository.findByValue(role.value);
      if (!alreadyExists) {
        const data = await this.roleRepository.create(role);
        resultRoles.push(data);
      } else {
        resultRoles.push(alreadyExists);
      }
    }
   const adminRole = resultRoles.filter(role => role.value === 'ADMIN');
   const email = 'john.doe@example.com';
   const password = '$2a$09$Dgtu2UsIIeNIm.GwltbPJumySLmSAYXXoSVw6JrkbnKTH6I7how5q'; // senha123
   await this.userRepository.create({
     email,
     password,
     role_id: adminRole[0].id
   })

    return resultRoles;
  }
}
