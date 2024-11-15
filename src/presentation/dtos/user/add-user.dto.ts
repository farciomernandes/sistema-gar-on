import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddUserDto {
  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    example: 'senha123',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  role_id: string;

  static toDto(payload: AddUserDto): AddUserDto {
    return plainToClass(AddUserDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
