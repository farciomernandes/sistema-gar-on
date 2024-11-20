import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  GetAllOrdersDto,
  OrderParamsDto,
} from '@/presentation/dtos/order/order-model.dto';
import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
@Injectable()
export class DbListOrder {
  constructor(private readonly orderRepository: OrderTypeOrmRepository) {}

  async getAll(
    params: OrderParamsDto
  ): Promise<GetAllOrdersDto> {
    try {
      let response: GetAllOrdersDto  = await this.orderRepository.getAll(params);
    
      return {
        orders: response.orders,
        pages: response.pages,
        total: response.total,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}