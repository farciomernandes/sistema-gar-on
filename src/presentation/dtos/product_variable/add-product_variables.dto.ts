import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, IsNumber } from 'class-validator';

export class AddProductVariablesModel {

  @ApiProperty({
    type: String,
    example: 'Product Description',
    required: false,
  })
  @Expose()
  description: string;

  @ApiProperty({
    example: 'Large Product Description',
    required: false,
  })
  @Expose()
  large_description: string;

  @ApiProperty({
    example: 100,
  })
  @Expose()
  price: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  @Expose()
  installment_count: number;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  @Expose()
  installment_value: number;

  @ApiProperty({
    type: Number,
    example: 90,
  })
  @Expose()
  discount_price: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  @Expose()
  discount_percent: number;

  @ApiProperty({
    example: 'SKU123',
  })
  @Expose()
  sku: string;

  @ApiProperty({
    example: 10,
  })
  @Expose()
  quantity: number;

  @ApiProperty({
    example: 'large',
    description: 'cm',
  })
  @Expose()
  size: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file',
  })
  @IsString()
  @Expose()
  image_link: string;

  @ApiProperty({
    type: String,
    example: '994fb2cd-0f39-4a71-b15c-333b7e2ff793',
  })
  @Expose()
  @IsUUID()
  product_id: string;

  @ApiProperty({
    example: 'Ferro nobre',
  })
  @Expose()
  type: string;

  @ApiProperty({
    example: 1.5,
    description: 'kg',
  })
  @Expose()
  weight: number;

  @ApiProperty({
    example: 'Triangular',
  })
  @Expose()
  format: string;

  @ApiProperty({
    example: 30,
    description: 'cm',
  })
  @Expose()
  length: number;

  @ApiProperty({
    example: 20,
    description: 'cm',
  })
  @Expose()
  height: number;

  @ApiProperty({
    example: 10,
    description: 'cm',
  })
  @Expose()
  width: number;

  @ApiProperty({
    example: 10,
    description: 'cm',
  })
  @Expose()
  diameter: number;

  static toDto(payload: AddProductVariablesModel): AddProductVariablesModel {
    return plainToInstance(AddProductVariablesModel, payload, {
      excludeExtraneousValues: true,
    });
  }
}
