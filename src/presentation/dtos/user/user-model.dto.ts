import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { RoleModel } from '../role/role-model.dto';

export class UserModelDto {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'example@example.com',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: RoleModel,
    example: RoleModel,
  })
  @Expose()
  role: RoleModel;

  static toDto(payload: any): UserModelDto {
    const user = plainToClass(UserModelDto, payload, {
      excludeExtraneousValues: true,
    });

    const role = RoleModel.toDto(payload.role);

    return {
      ...user,
      role,
    };
  }
}

export class GetAllUsersDto {
  @ApiProperty({
    type: Number,
    example: 20,
    required: false,
  })
  @Expose()
  total: number;

  @ApiProperty({
    type: [UserModelDto],
    example: UserModelDto,
  })
  @Expose()
  users: UserModelDto[];

  @ApiProperty({
    example: 3,
    description: 'Número total de páginas',
  })
  pages: number;

  static toDto(payload: any): GetAllUsersDto {
    return plainToClass(GetAllUsersDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'example@example.com',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class UserParamsDto {
  
  @ApiProperty({
    example: 1,
    description: 'Número da página desejada',
    required: true,
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: 'Número máximo de resultados por página',
    required: true,
  })
  limit: number;
}
