import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
  } from '@nestjs/common';
  import { UserRepository } from '@/core/domain/protocols/repositories/user';
  import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
  import { OrderModelDto } from '@/presentation/dtos/order/order-model.dto';
  import { ProductRepository } from '@/core/domain/protocols/repositories/product';
  import { DataSource, EntityManager } from 'typeorm';
import { OrderTypeOrmRepository } from '@/infra/db/typeorm/repositories/order-typeorm.repository';
import { OrderItemTypeOrmRepository } from '@/infra/db/typeorm/repositories/order_item-typeorm.repository';
  
  @Injectable()
  export class DbAddOrder {
    private readonly logger = new Logger(DbAddOrder.name);
  
    constructor(
      private readonly orderRepository: OrderTypeOrmRepository,
      private readonly orderItemRepository: OrderItemTypeOrmRepository,
      private readonly productRepository: ProductRepository,
      private dataSource: DataSource,
    ) {}
  
    async create(payload: AddOrderDto): Promise<any> {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      try {
        const order = await this.createOrder(queryRunner.manager);

        const orderItems = await this.createOrderItems(
          payload.order_items,
          order.id,
          queryRunner.manager,
        );

        const total = this.calculateTotal(orderItems);

        await this.updateOrderTotal(order.id, total, queryRunner.manager, payload.title);
        order.order_items = orderItems;
        order.total = total;

        await queryRunner.commitTransaction();

        return {
          ...order,
          title: payload.title,
        };
      } catch (error) {
        this.handleException(error);
      }
    }
  
    private async createOrder(entityManager: EntityManager) {
      try {
        const order = await this.orderRepository.createTransactionMode(
          { total: 0, title: '', order_items: [] },
          entityManager,
        );
  
        return order;
      } catch (error) {
        return error;
      }
    }
  
    private async createOrderItems(
      orderItemsPayload: any[],
      orderId: string,
      entityManager: EntityManager,
    ) {
      const orderItems: any[] = [];
      for (const item of orderItemsPayload) {
  
        const product = await this.getProduct(item.product_id);

        const subTotal = this.calculateSubtotal(
          item.quantity,
          product.price,
        );

        orderItems.push({
          id: item.product_id,
          quantity: item.quantity,
          sub_total: subTotal,
          product: product,
        });
        await this.createDbOrderItem(
          orderId,
          item.product_id,
          item.quantity,
          subTotal,
          entityManager,
        );
      }

      return orderItems;
    }
  
    private async getProduct(productId: string) {
      const product = await this.productRepository.findById(productId);
      if (!product) {
        throw new BadRequestException(`Product with ${productId} id not found`);
      }
      return product;
    }
  
    private calculateSubtotal(
      quantity: number,
      price: number,
    ) {
      
      let subTotal = quantity * price;

      return subTotal;
    }
  
    private calculateTotal(orderItems: any[]) {
      let total = 0;

      for (const item of orderItems) {
        total += Number(item.sub_total);
      }
      return Number(total);
    }
  
    private async createDbOrderItem(
      orderId: string,
      productId: string,
      quantity: number,
      sub_total: number,
      entityManager: EntityManager,
    ) {

      await this.orderItemRepository.createTransactionMode(
        {
          order_id: orderId,
          product_id: productId,
          quantity: quantity,
          sub_total,
        },
        entityManager,
      );
    }
  
    private async updateOrderTotal(
      orderId: string,
      total: number,
      entityManager: EntityManager,
      title: string,
    ): Promise<void> {

      await this.orderRepository.updateTransactionMode(
        total,
        orderId,
        title,
        entityManager,
      );
    }
  
    private handleException(error: Error) {
      this.logger.error(error.message);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }