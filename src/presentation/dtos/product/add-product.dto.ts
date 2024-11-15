import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AddProductModelDto {
  @ApiProperty({
    type: String,
    example: 'Product Name',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: '994fb2cd-0f39-4a71-b15c-333b7e2ff793',
    required: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  category_id: string;

  @ApiProperty({
    type: Number,
    required: true,
  })
  quantity: number;

  @ApiProperty({
    type: String,
    example: '994fb2cd-0f39-4a71-b15c-333b7e2ff793',
    required: false,
  })
  description: string;

  @ApiProperty({
    type: String,
    example: '994fb2cd-0f39-4a71-b15c-333b7e2ff793',
    required: true,
  })
  unit: string;

  @ApiProperty({
    type: Number,
    example: 12,
    required: true,
  })
  price: number;

  static toDto(payload: AddProductModelDto): AddProductModelDto {
    return plainToInstance(AddProductModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
