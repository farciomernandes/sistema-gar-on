import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryModelDto {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'Category Name',
    required: false,
  })
  @Expose()
  @IsString()
  name: string;

  static toDto(payload: CategoryModelDto): CategoryModelDto {
    return plainToInstance(CategoryModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
