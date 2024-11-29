import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
import { OrderItem } from './order_item.entity';
import { Table } from './table.entity';
  
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

    @OneToOne(() => Table)
    @JoinColumn({ name: 'table_id' })
    table: Table;
  
    @Column()
    table_id: string;
}