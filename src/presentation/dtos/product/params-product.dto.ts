import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsOptional } from 'class-validator';

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
    example: 'snack | stock',
    required: false,
  })
  @Expose()
  type: string;

  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
  })
  @Expose()
  @IsOptional()
  page: number;

  @ApiProperty({
    type: Number,
    example: 8,
    required: false,
  })
  @IsOptional()
  @Expose()
  limit: number;

  static toDTO(payload: any): ProductParamsDTO {
    return plainToClass(ProductParamsDTO, payload, {
      excludeExtraneousValues: true,
    });
  }
}
