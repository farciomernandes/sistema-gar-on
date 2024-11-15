import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddCategoryDto {
  @ApiProperty({
    type: String,
    example: 'Category Name',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  static toDto(payload: AddCategoryDto): AddCategoryDto {
    return plainToClass(AddCategoryDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
