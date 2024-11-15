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

  static toDto(payload: UpdateCategoryDto): UpdateCategoryDto {
    return plainToClass(UpdateCategoryDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
