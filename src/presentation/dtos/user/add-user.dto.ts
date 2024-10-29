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
    example: 'John Doe',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: '123.456.789-00',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({
    type: String,
    example: 'RG1234567',
    required: false,
  })
  @Expose()
  @IsOptional()
  @IsString()
  document?: string;

  @ApiProperty({
    type: String,
    example: 'MALE',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  sex: string;

  @ApiProperty({
    type: String,
    example: '1990-01-01',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  birthdate: string;

  @ApiProperty({
    type: String,
    example: '+1234567890',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  phone: string;

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
