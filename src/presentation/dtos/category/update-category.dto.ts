import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

export class UpdateCategoryDto {
  @ApiProperty({
    type: String,
    example: 'Category Name',
    required: true,
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file',
  })
  @Expose()
  image_link: string;

  @ApiProperty({
    type: String,
    example: 'Category Description',
    required: true,
  })
  @Expose()
  description: string;

  static toDto(payload: UpdateCategoryDto): UpdateCategoryDto {
    return plainToClass(UpdateCategoryDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
