import { RolesEnum } from '@/shared/enums/roles.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class UpdateRoleDto {
  @ApiProperty({
    type: String,
    example: RolesEnum.ADMIN,
    required: true,
  })
  @Expose()
  value: string;

  @ApiProperty({
    type: String,
    example: 'Role de acesso geral a todas as funcionalidades do sistema.',
    required: true,
  })
  @Expose()
  label: string;

  static toDto(payload: UpdateRoleDto): UpdateRoleDto {
    return plainToInstance(UpdateRoleDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
