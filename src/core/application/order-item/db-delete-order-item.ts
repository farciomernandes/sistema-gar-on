import { OrderItemTypeOrmRepository } from '@/infra/db/typeorm/repositories/order_item-typeorm.repository';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  
  @Injectable()
  export class DbDeleteOrderItem {
    constructor(private readonly orderItemRepository: OrderItemTypeOrmRepository) {}
  
    async delete(id: string): Promise<void> {
      try {
        const alreadyExists = await this.orderItemRepository.findById(id);
  
        if (!alreadyExists) {
          throw new BadRequestException(`OrderItem not found`);
        }
        await this.orderItemRepository.delete(id);
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }