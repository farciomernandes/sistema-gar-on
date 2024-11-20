import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { UserModelDto } from '../user/user-model.dto';
import { OrderItemDto } from '../order_item/order_item-model.dto';

export class OrderModelDto {
  @ApiProperty({
    type: String,
    example: '4801d530-f7c6-4fb7-a04d-480d3a7adf40',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'Vendas mesa 1',
    required: true,
  })
  @Expose()
  title: string;

  @ApiProperty({
    type: Number,
    example: 100,
    required: true,
  })
  @Expose()
  total: number;


  @ApiProperty({
    type: [OrderItemDto],
    isArray: true,
    description: 'Array of OrderItemLocally',
    example: [OrderItemDto],
  })
  @Expose()
  @IsOptional()
  order_items: OrderItemDto[];

}

export class OrderParamsDto {
  @ApiProperty({
    type: String,
    example: '4801d530-f7c6-4fb7-a04d-480d3a7adf40',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 10,
    description: 'Número máximo de resultados por página',
    required: true,
  })
  limit: number;

  @ApiProperty({
    example: 1,
    description: 'Número da página desejada',
    required: true,
  })
  page: number;

  @ApiProperty({
    example: new Date(),
    description: 'Data inicial',
    required: false,
  })
  start_date?: Date;

  @ApiProperty({
    example: new Date(),
    description: 'Data final',
    required: false,
  })
  end_date?: Date;
}

export class GetAllOrdersDto {
  @ApiProperty({
    type: [OrderModelDto],
    example: {
      "orders": [
        {
          "id": "00dc7eab-551e-411e-8f89-b162be8fa161",
          "title": "Venda mesa 1",
          "total": 88,
          "order_items": [
            {
              "id": "4255c47b-923e-486a-9a77-a2cae18d36ca",
              "quantity": 2,
              "order_id": "00dc7eab-551e-411e-8f89-b162be8fa161",
              "sub_total": 44,
              "product_id": "217ab8e7-ada5-4074-baff-33070bd735fb",
              "product": {
                "id": "217ab8e7-ada5-4074-baff-33070bd735fb",
                "name": "Hamburguer de Queijo",
                "description": "Hamburguer gostoso feito na hora com Queijo de javaré albino",
                "is_snack": 1,
                "price": 22,
                "quantity": null,
                "unit": "KG",
                "category_id": "b6918087-55e3-427d-856b-c74ff174685a",
                "category": {
                  "id": "b6918087-55e3-427d-856b-c74ff174685a",
                  "name": "Snack 1"
                }
              }
            },
          ]
        }
      ],
    },
    description: 'Lista de pedidos retornados',
  })
  orders: OrderModelDto[];

  @ApiProperty({
    example: 3,
    description: 'Número total de páginas',
  })
  pages: number;

  @ApiProperty({
    example: 25,
    description: 'Número total de resultados',
  })
  total: number;
}