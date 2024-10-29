import { ApiProperty } from '@nestjs/swagger';
import { RoleModel } from '../role/role-model.dto';

export class Authenticated {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
  })
  id: string;

  @ApiProperty({
    type: RoleModel,
    required: true,
    example: RoleModel,
  })
  roles: RoleModel;
}
