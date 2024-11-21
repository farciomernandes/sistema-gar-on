import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, IsNumber, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AddProductModelDto {
  @ApiProperty({
    type: String,
    example: 'Product Name',
    required: false,
  })
  @Expose()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @IsOptional()
  quantity: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: '1 para TRUE se for lanche e 0 para FALSE se for um produto de estoque',
    example: 1,
  })
  is_snack: number = 1;

  @ApiProperty({
    type: String,
    example: 'Um lanche delicioso pra você e toda sua familía',
    required: false,
  })
  description: string;

  @ApiProperty({
    type: String,
    example: 'KG',
    required: false,
  })
  @IsOptional()
  unit: string;

  @ApiProperty({
    type: Number,
    example: 12,
    required: false,
  })
  @IsOptional()
  price: number;

  @ApiProperty({
    type: String,
    example: '994fb2cd-0f39-4a71-b15c-333b7e2ff793',
    required: false,
  })
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  category_id: string;

  static toDto(payload: AddProductModelDto): AddProductModelDto {
    return plainToInstance(AddProductModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
