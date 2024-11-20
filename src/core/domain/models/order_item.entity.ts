import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Order } from './order.entity';
  import { Product } from './product.entity';
  
  @Entity('order_items')
  export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    quantity: number;
  
    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;
  
    @Column()
    order_id: string;

    @Column({ type: 'numeric' })
    sub_total: number;

    @Column()
    product_id: string;
  
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}