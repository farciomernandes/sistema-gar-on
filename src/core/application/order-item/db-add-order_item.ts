import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { AddOrderItemDto } from '@/presentation/dtos/order_item/add-order_item.dto';
  import { OrderItemDto } from '@/presentation/dtos/order_item/order_item-model.dto';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { OrderItemTypeOrmRepository } from '@/infra/db/typeorm/repositories/order_item-typeorm.repository';
import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
  
  @Injectable()
  export class DbAddOrderItem {
    constructor(
      private readonly orderItemRepository: OrderItemTypeOrmRepository,
      private readonly productRepository: ProductRepository,
      private readonly orderRepository: OrderTypeOrmRepository,
    ) {}
  
    async create(payload: AddOrderItemDto): Promise<OrderItemDto> {
      try {
        const product = await this.productRepository.findById(
          payload.product_id,
        );
        if (!product) {
          throw new BadRequestException(
            `Product with ${payload.product_id} id not found.`,
          );
        }
  
        const order = await this.orderRepository.findById(payload.order_id);
  
        if (!order) {
          throw new BadRequestException(
            `Order with ${payload.order_id} id not found.`,
          );
        }
  
        return await this.orderItemRepository.create(payload);
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw new InternalServerErrorException(error.message);
      }
    }
  }