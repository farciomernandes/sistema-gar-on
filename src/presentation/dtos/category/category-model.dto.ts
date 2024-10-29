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
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Image Link',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  image_link: string;

  @ApiProperty({
    type: String,
    example: 'Category Description',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  description: string;

  static toDto(payload: CategoryModelDto): CategoryModelDto {
    return plainToInstance(CategoryModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
