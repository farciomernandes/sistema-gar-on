import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
import { OrderItem } from './order_item.entity';
  
  @Entity('orders')
  export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    title: string;
  
    @Column({ type: 'numeric' })
    total: number;
  
    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    order_items: OrderItem[];
}