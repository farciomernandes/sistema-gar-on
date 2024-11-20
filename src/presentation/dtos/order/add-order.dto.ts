import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { OrderItemDto } from '../order_item/order_item-model.dto';

export class ProductModelDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class AddOrderDto {

  @ApiProperty({
    type: Number,
    example: 100.5,
  })
  @Expose()
  total: number;

  @ApiProperty({
    type: String,
    example: 'Venda mesa 1',
    required: true,
  })
  @Expose()
  title: string;

  @ApiProperty({
    type: OrderItemDto,
    example: [
      {
        quantity: 2,
        product_id: '217ab8e7-ada5-4074-baff-33070bd735fb',
        sub_total: 44
      },
      {
        quantity: 2,
        product_id: 'b1d80da2-f64f-4a40-9f9f-72771a71267c',
        sub_total: 44
      },
    ],
    required: true,
    isArray: true,
  })
  @Expose()
  order_items: OrderItemDto[];

  static toDto(payload: AddOrderDto): AddOrderDto {
    return plainToClass(AddOrderDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}

export class ListOrderDto {
  @ApiProperty({
    type: Number,
    example: 100.5,
    required: true,
  })
  @Expose()
  total: number;

  @ApiProperty({
    type: String,
    example: 'Venda mesa 1',
    required: false,
  })
  @Expose()
  title: string;

  @ApiProperty({
    type: OrderItemDto,
    example: [OrderItemDto],
    required: true,
    isArray: true,
  })
  @Expose()
  order_items: OrderItemDto[];

  static toDto(payload: ListOrderDto): ListOrderDto {
    return plainToClass(ListOrderDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}