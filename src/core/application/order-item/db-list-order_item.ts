import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrderItemDto } from '@/presentation/dtos/order_item/order_item-model.dto';
import { ListOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { AddProductModelDto } from '@/presentation/dtos/product/add-product.dto';
import { OrderItemTypeOrmRepository } from '@/infra/db/typeorm/repositories/order_item-typeorm.repository';

@Injectable()
export class DbListOrderItem {
  constructor(private readonly orderItemRepository: OrderItemTypeOrmRepository) {}

  async getAll(): Promise<OrderItemDto[]> {
    try {
      const orders = await this.orderItemRepository.getAll();

      return orders.map((order) => {
        return {
          ...OrderItemDto.toDto(order),
          order: ListOrderDto.toDto(order.order),
          product: AddProductModelDto.toDto(order.product),
        };
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}