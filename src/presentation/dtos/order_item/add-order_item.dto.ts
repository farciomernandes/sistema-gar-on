import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';

export class AddOrderItemDto {
  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @Expose()
  quantity: number;

  @ApiProperty({
    type: Number,
    example: 20,
    required: true,
  })
  sub_total: number;

  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: true,
  })
  @Expose()
  order_id: string;

  @ApiProperty({
    type: String,
    example: 'cfeb2134-1482-4064-a6c9-2b5c9938454b',
    required: true,
  })
  @Expose()
  product_id: string;

  static toDto(payload: AddOrderItemDto): AddOrderItemDto {
    return plainToClass(AddOrderItemDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}