import { EntitySchema } from 'typeorm';
import { Order } from '@/core/domain/models/order.entity';
import { OrderItem } from '@/core/domain/models/order_item.entity';

export const OrdersSchema = new EntitySchema<Order>({
  name: Order.name,
  target: Order,
  tableName: 'orders',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    title: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    total: {
      type: 'numeric',
      nullable: false,
    },
  },
  relations: {
    order_items: {
        type: 'one-to-many',
        target: () => OrderItem,
        inverseSide: 'order',
        joinColumn: {
          name: 'order_id',
        },
      },
  },
});
