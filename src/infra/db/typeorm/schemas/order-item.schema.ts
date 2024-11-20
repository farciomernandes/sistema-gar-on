import { EntitySchema } from 'typeorm';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { Order } from '@/core/domain/models/order.entity';
import { Product } from '@/core/domain/models/product.entity';

export const OrderItemsSchema = new EntitySchema<OrderItem>({
  name: OrderItem.name,
  target: OrderItem,
  tableName: 'order_items',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    quantity: {
      type: 'numeric',
      nullable: true,
    },
    order_id: {
      type: 'uuid',
      nullable: false,
    },
    sub_total: {
      type: 'numeric',
      nullable: false,
    },
    product_id: {
      type: 'uuid',
      nullable: false,
    },
  },
  relations: {
    order: {
      type: 'many-to-one',
      target: () => Order,
      joinColumn: { name: 'order_id' },
      eager: true,
    },
    product: {
      type: 'many-to-one',
      target: () => Product,
      joinColumn: { name: 'product_id' },
      eager: true,
    },
  },
});
