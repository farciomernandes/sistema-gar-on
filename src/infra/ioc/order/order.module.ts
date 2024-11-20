import { Module } from '@nestjs/common';
import { orderProvider } from './order.provider';
import { DbAddOrder } from '@/core/application/order/db-add-order';
import { DbListOrder } from '@/core/application/order/db-list-order';
import { DbDeleteOrder } from '@/core/application/order/db-delete-order';
import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
import { OrderController } from '@/presentation/controllers/order/order-controller';

@Module({
  imports: [],
  providers: [...orderProvider],
  controllers: [OrderController],
  exports: [
    DbAddOrder,
    DbListOrder,
    DbDeleteOrder,
    OrderTypeOrmRepository,
  ],
})
export class OrderModule {}
