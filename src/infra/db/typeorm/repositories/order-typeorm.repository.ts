import { EntityManager, Repository } from 'typeorm';
import { Order } from '@/core/domain/models/order.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { addDays } from 'date-fns';
import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
import { UpdateOrderDto } from '@/presentation/dtos/order/update-order.dto';
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
    payload: UpdateOrderDto,
    id: string,
    entityManager?: EntityManager,
  ): Promise<OrderModelDto> {
    try {
      const repository = entityManager
        ? entityManager.getRepository(Order)
        : this.orderRepository;

      const order = await repository.findOneOrFail({
        where: { id },
      });

      await repository.merge(order, payload);
      await repository.save(order);
      const response = await this.findById(id);
      return response;
    } catch (error) {
      throw new Error('Order not found');
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
    entityManager?: EntityManager,
  ): Promise<any> {
    try {
      const repository = entityManager.getRepository(Order);

      const order = await repository.findOneOrFail({
        where: { id },
      });

      await repository.merge(order, {total, title});

      await repository.save(order);

      return await repository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Order not found');
    }
  }
}