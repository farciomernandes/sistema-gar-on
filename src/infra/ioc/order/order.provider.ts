import { Provider } from '@nestjs/common';
import { DbAddOrder } from '@/core/application/order/db-add-order';
import { OrderTypeOrmRepository } from '../../db/typeorm/repositories/order-typeorm.repository';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DbListOrder } from '@/core/application/order/db-list-order';
import { DbDeleteOrder } from '@/core/application/order/db-delete-order';
import { DbUpdateOrder } from '@/core/application/order/db-update-order';
import { Order } from '@/core/domain/models/order.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { ProductTypeOrmRepository } from '@/infra/db/typeorm/repositories/product-typeorm.repository';
import { Product } from '@/core/domain/models/product.entity';
import { OrderItemTypeOrmRepository } from '@/infra/db/typeorm/repositories/order_item-typeorm.repository';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { DbAddOrderItem } from '@/core/application/order-item/db-add-order_item';


export const orderProvider: Provider[] = [
  DbAddOrder,
  DbListOrder,
  DbDeleteOrder,
  DbUpdateOrder,
  {
    provide: OrderTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new OrderTypeOrmRepository(dataSource.getRepository(Order), dataSource.getRepository(OrderItem));
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
    provide: ProductRepository,
    useFactory: (dataSource: DataSource) => {
      const productRepository = dataSource.getRepository(Product);
      return new ProductTypeOrmRepository(productRepository);
    },
    inject: [getDataSourceToken()],
  },
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
    provide: DbAddOrder,
    useFactory: (
      orderRepository: OrderTypeOrmRepository,
      orderItemRepository: OrderItemTypeOrmRepository,
      productRepository: ProductRepository,
      dataSource: DataSource,
    ): DbAddOrder => {
      return new DbAddOrder(
        orderRepository,
        orderItemRepository,
        productRepository,
        dataSource,
      );
    },
    inject: [
      OrderTypeOrmRepository,
      OrderItemTypeOrmRepository,
      ProductTypeOrmRepository,
      getDataSourceToken(),
    ],
  },
  {
    provide: DbListOrder,
    useFactory: (orderRepository: OrderTypeOrmRepository): DbListOrder => {
      return new DbListOrder(orderRepository);
    },
    inject: [OrderTypeOrmRepository],
  },
  {
    provide: DbUpdateOrder,
    useFactory: (
      orderRepository: OrderTypeOrmRepository,
    ): DbUpdateOrder => {
      return new DbUpdateOrder(orderRepository);
    },
    inject: [OrderTypeOrmRepository],
  },
  {
    provide: DbDeleteOrder,
    useFactory: (orderRepository: OrderTypeOrmRepository): DbDeleteOrder => {
      return new DbDeleteOrder(orderRepository);
    },
    inject: [OrderTypeOrmRepository],
  },
];