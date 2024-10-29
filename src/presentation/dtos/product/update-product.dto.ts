import { Expose, plainToInstance } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
import { ProductVariablesModel } from '../product_variable/product_variables-model.dto';

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

  @ApiProperty({
    type: String,
    example: ProductVariablesModel,
  })
  @Expose()
  @Optional()
  product_variables?: ProductVariablesModel[];

  static toDto(payload: UpdateProductModelDto): UpdateProductModelDto {
    return plainToInstance(UpdateProductModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
