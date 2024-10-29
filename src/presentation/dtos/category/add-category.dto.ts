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

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  image_link: string;

  @ApiProperty({
    type: String,
    example: 'Category Description',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  description: string;

  static toDto(payload: AddCategoryDto): AddCategoryDto {
    return plainToClass(AddCategoryDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
