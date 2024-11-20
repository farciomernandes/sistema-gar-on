import { Module } from '@nestjs/common';
import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
import { orderItemProvider } from './order_item.provider';
import { DbAddOrderItem } from '@/core/application/order-item/db-add-order_item';
import { DbListOrderItem } from '@/core/application/order-item/db-list-order_item';
import { DbDeleteOrderItem } from '@/core/application/order-item/db-delete-order-item';
import { OrderItemController } from '@/presentation/controllers/order_item/order_item-controller';

@Module({
  imports: [],
  providers: [...orderItemProvider],
  controllers: [OrderItemController],
  exports: [
    DbAddOrderItem,
    DbListOrderItem,
    DbDeleteOrderItem,
    OrderTypeOrmRepository,
  ],
})
export class OrderItemModule {}
