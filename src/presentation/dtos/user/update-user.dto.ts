import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Expose()
  email: string;

  @ApiProperty({
    type: String,
    example: 'senha123',
  })
  @Expose()
  password: string;

  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: String,
    example: '123.456.789-00',
  })
  @Expose()
  cpf: string;

  @ApiProperty({
    type: String,
    example: 'RG1234567',
  })
  @Expose()
  document: string;

  @ApiProperty({
    type: String,
    example: 'MALE',
  })
  @Expose()
  sex: string;

  @ApiProperty({
    type: String,
    example: '1990-01-01',
  })
  @Expose()
  birthdate: string;

  @ApiProperty({
    type: String,
    example: '+1234567890',
  })
  @Expose()
  phone: string;

  static toDto(payload: UpdateUserDto): UpdateUserDto {
    return plainToClass(UpdateUserDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
