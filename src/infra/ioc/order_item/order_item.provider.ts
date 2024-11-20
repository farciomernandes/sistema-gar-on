import { Provider } from '@nestjs/common';
import { OrderItemTypeOrmRepository } from '../../db/typeorm/repositories/order_item-typeorm.repository';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
import { Order } from '@/core/domain/models/order.entity';
import { DbAddOrderItem } from '@/core/application/order-item/db-add-order_item';
import { DbDeleteOrderItem } from '@/core/application/order-item/db-delete-order-item';
import { DbListOrderItem } from '@/core/application/order-item/db-list-order_item';
import { ProductTypeOrmRepository } from '@/infra/db/typeorm/repositories/product-typeorm.repository';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';

export const orderItemProvider: Provider[] = [
  DbAddOrderItem,
  DbListOrderItem,
  DbDeleteOrderItem,
  {
    provide: OrderItemTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new OrderItemTypeOrmRepository(
        dataSource.getRepository(OrderItem),
      );
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: ProductTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new ProductTypeOrmRepository(
        dataSource.getRepository(Product),
      );
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: OrderTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new OrderTypeOrmRepository(dataSource.getRepository(Order), dataSource.getRepository(OrderItem));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: DbAddOrderItem,
    useFactory: (
      orderItemRepository: OrderItemTypeOrmRepository,
      productRepository: ProductRepository,
      orderRepository: OrderTypeOrmRepository,
    ): DbAddOrderItem => {
      return new DbAddOrderItem(
        orderItemRepository,
        productRepository,
        orderRepository,
      );
    },
    inject: [
      OrderItemTypeOrmRepository,
      ProductTypeOrmRepository,
      OrderTypeOrmRepository,
    ],
  },
  {
    provide: DbListOrderItem,
    useFactory: (orderItemRepository: OrderItemTypeOrmRepository): DbListOrderItem => {
      return new DbListOrderItem(orderItemRepository);
    },
    inject: [OrderItemTypeOrmRepository],
  },
  {
    provide: DbDeleteOrderItem,
    useFactory: (
      orderItemRepository: OrderItemTypeOrmRepository,
    ): DbDeleteOrderItem => {
      return new DbDeleteOrderItem(orderItemRepository);
    },
    inject: [OrderItemTypeOrmRepository],
  },
];