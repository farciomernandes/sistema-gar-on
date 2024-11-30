import { Injectable } from '@nestjs/common';
import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';
import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';

@Injectable()
export class DbUpdateOrder {
  constructor(
    private readonly orderRepository: OrderTypeOrmRepository) {}

  async update(id: string, payload: OrderModelDto): Promise<OrderModelDto> {
    try {
     
      const order = await this.orderRepository.update(payload, id);

      return order;
    } catch (error) {
      throw error;
    }
  }
}