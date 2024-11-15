import { Expose, plainToInstance } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class UpdateProductModelDto {
  @ApiProperty({
    type: String,
    example: 'Product Name',
  })
  @Expose()
  name: string;

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
