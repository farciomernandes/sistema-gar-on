import { Expose, plainToInstance } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateProductModelDto {
  @ApiProperty({
    type: String,
    example: 'Product Name',
    required: false,
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  quantity: number;

  @ApiProperty({
    type: String,
    example: '994fb2cd-0f39-4a71-b15c-333b7e2ff793',
    required: false,
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    type: String,
    example: '994fb2cd-0f39-4a71-b15c-333b7e2ff793',
    required: false,
  })
  unit: string;

  @ApiProperty({
    type: Number,
    example: 12,
    required: false,
  })
  price: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: '1 para TRUE se for lanche e 0 para FALSE se for um produto de estoque'
  })
  is_snack: number;

  @ApiProperty({
    type: String,
    example: '30c50624-fc36-4c51-8d19-e655196dab8d',
  })
  @Expose()
  category_id: string;

  static toDto(payload: UpdateProductModelDto): UpdateProductModelDto {
    return plainToInstance(UpdateProductModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
