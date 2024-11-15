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

  static toDto(payload: UpdateUserDto): UpdateUserDto {
    return plainToClass(UpdateUserDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
