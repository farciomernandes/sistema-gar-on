import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

export class ProductParamsDTO {
  @ApiProperty({
    type: String,
    example: 'Product ID',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'd2f6d8f8-8d0d-4110-bf63-af23fd441138',
    required: false,
  })
  @Expose()
  category_id: string;

  @ApiProperty({
    type: String,
    example: 'Product Name',
    required: false,
  })
  @Expose()
  name: string;

  @ApiProperty({
    type: Number,
    example: 100,
    required: false,
  })
  @Expose()
  price: number;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @Expose()
  page: number;

  @ApiProperty({
    type: Number,
    example: 8,
    required: true,
  })
  @Expose()
  limit: number;

  @ApiProperty({
    type: String,
    example: '00001',
    required: false,
  })
  @Expose()
  sku: string;

  @ApiProperty({
    type: String,
    example: true,
    required: false,
  })
  @Expose()
  discount: boolean;

  static toDTO(payload: any): ProductParamsDTO {
    return plainToClass(ProductParamsDTO, payload, {
      excludeExtraneousValues: true,
    });
  }
}
