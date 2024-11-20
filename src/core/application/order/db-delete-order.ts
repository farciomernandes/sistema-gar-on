import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  
  @Injectable()
  export class DbDeleteOrder {
    constructor(private readonly orderRepository: OrderTypeOrmRepository) {}
  
    async delete(id: string): Promise<void> {
      try {

        const alreadyExists = await this.orderRepository.findById(id);

        if (!alreadyExists) {
          throw new BadRequestException(`Order not found`);
        }

        await this.orderRepository.delete(id);
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }