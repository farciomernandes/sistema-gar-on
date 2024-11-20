import { EntityManager, Repository } from 'typeorm';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { OrderItemDto } from '@/presentation/dtos/order_item/order_item-model.dto';
import { AddOrderItemDto } from '@/presentation/dtos/order_item/add-order_item.dto';

export class OrderItemTypeOrmRepository {
  constructor(private readonly orderItemRepository: Repository<OrderItem>) {}
  async createTransactionMode(
    payload: AddOrderItemDto,
    entityManager: EntityManager,
  ): Promise<OrderItemDto> {
    const repository = entityManager
      ? entityManager.getRepository(OrderItem)
      : this.orderItemRepository;

    const orderItem = repository.create(payload);

    const order = await repository.save(orderItem);

    return order;
  }

  async findById(id: string): Promise<OrderItem> {
    return this.orderItemRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.orderItemRepository.delete(id);
  }

  async getAll(): Promise<OrderItemDto[]> {
    const orderItems = await this.orderItemRepository.find({
      relations: ['order', 'product'],
    });

    return orderItems.map((order) => OrderItemDto.toDto(order));
  }

  async create(payload: AddOrderItemDto): Promise<OrderItemDto> {
    const orderItem = this.orderItemRepository.create(payload);
    const order = this.orderItemRepository.save(orderItem);
    return OrderItemDto.toDto(order);
  }
}