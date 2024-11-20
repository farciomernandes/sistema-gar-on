import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';
import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';

@Injectable()
export class DbUpdateOrder {
  constructor(
    private readonly orderRepository: OrderTypeOrmRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async update(payload: UpdateOrderDto, id: string): Promise<OrderModelDto> {
    try {
     
      const order = await this.orderRepository.update(payload, id);

      return order;
    } catch (error) {
      throw error;
    }
  }
}