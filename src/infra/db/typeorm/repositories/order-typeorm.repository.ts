import { EntityManager, Repository } from 'typeorm';
import { Order } from '@/core/domain/models/order.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { addDays } from 'date-fns';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { OrderModelDto, OrderParamsDto } from '@/presentation/dtos/order/order-model.dto';
import { OrderItem } from '@/core/domain/models/order_item.entity';

export class OrderTypeOrmRepository {
  constructor(private readonly orderRepository: Repository<Order>,
    private readonly orderItemRepository: Repository<OrderItem>
  ) {}

  async createTransactionMode(
    payload: AddOrderDto,
    entityManager: EntityManager,
  ) {
    try {
      const repository = entityManager
        ? entityManager.getRepository(Order)
        : this.orderRepository;

      const order = repository.create({
        ...payload,
      });

      const orderSaved = await repository.save(order);

      return orderSaved;
    } catch (error) {
      console.log(error);
    }
  }

  async update(
    payload: OrderModelDto,
    id: string,
    entityManager?: EntityManager,
  ): Promise<OrderModelDto> {
    try {
      const repository = entityManager
        ? entityManager.getRepository(Order)
        : this.orderRepository;
  
      const order = await repository.findOneOrFail({
        where: { id },
        relations: ['order_items'],
      });
  
      await repository.merge(order, payload);
  
      if (payload.order_items) {
        const existingItems = order.order_items;
  
        const itemsToRemove = existingItems.filter(
          (existingItem) => !payload.order_items.some(
            (newItem) => newItem.id === existingItem.id,
          ),
        );
  
        const itemsToUpdate = payload.order_items.map((newItem) => {
          const existingItem = existingItems.find(
            (item) => item.id === newItem.id,
          );
  
          if (existingItem) {
            Object.assign(existingItem, newItem);
  
            existingItem.sub_total = existingItem.quantity * existingItem.product.price;
            return existingItem;
          }
  
          const newOrderItem = this.orderItemRepository.create(newItem);
          newOrderItem.order_id = order.id;
  
          newOrderItem.sub_total = newOrderItem.quantity * newOrderItem.product.price;
          return newOrderItem;
        });
  
        await this.orderItemRepository.save(itemsToUpdate);
  
        if (itemsToRemove.length > 0) {
          await this.orderItemRepository.remove(itemsToRemove);
        }
  
        const newTotal = itemsToUpdate.reduce((total, item) => total + item.sub_total, 0);
        order.total = newTotal;
      }
  
      await repository.save(order);
  
      const response = await this.findById(id);
      return response;
    } catch (error) {
      throw new InternalServerErrorException(`Order updated error: ${JSON.stringify(error)}`);
    }
  }
  
  

  async findById(id: string): Promise<any> {
    const queryBuilder = await this.orderRepository
      .createQueryBuilder('order')
      .andWhere('order.id = :id', {
        id: id,
      });
    const order = await queryBuilder.getOne();

    if (!order) {
      return null;
    }
    return order;
  }


  async delete(id: string): Promise<void> {
    await this.orderItemRepository.delete({ order_id: id });

    await this.orderRepository.delete(id);
  }

  async getAll(
    params: OrderParamsDto,
  ): Promise<any> {
    let queryBuilder = this.orderRepository
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.order_items', 'order_items')
    .leftJoinAndSelect('order_items.product', 'product')
    .leftJoinAndSelect('product.category', 'category')

    if (params.id) {
      queryBuilder = queryBuilder.andWhere('order.id = :id', {
        id: params.id,
      });
    }


    if (params.start_date && params.end_date) {
      const adjustedEndDate = addDays(new Date(params.end_date), 1);
      queryBuilder = queryBuilder.andWhere(
        'order.created_at BETWEEN :start_date AND :end_date',
        {
          start_date: new Date(params.start_date),
          end_date: new Date(adjustedEndDate),
        },
      );
    }

    const total = await queryBuilder.getCount();

    const totalPages = Math.ceil(total / params.limit);

    const ordersWithItemsAndProducts = await queryBuilder
      .take(params.limit)
      .skip((params.page - 1) * params.limit)
      .getMany();

    return { orders: ordersWithItemsAndProducts, pages: totalPages, total };
  }

  async create(payload: AddOrderDto): Promise<any> {
    try {
      const order = this.orderRepository.create({
        ...payload,
      });
      const orderSaved = await this.orderRepository.save(order);

      return orderSaved;
    } catch (error) {
      console.log(error);
    }
  }

  async updateTransactionMode(
    total: number,
    id: string,
    title: string,
    table_id: string,
    entityManager?: EntityManager,
  ): Promise<any> {
    try {
      const repository = entityManager.getRepository(Order);

      const order = await repository.findOneOrFail({
        where: { id },
      });

      await repository.merge(order, {total, title, table_id});

      await repository.save(order);

      return await repository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Order not found');
    }
  }
}