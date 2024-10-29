import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Product } from './product.entity';

@Entity('product_variables')
export class ProductVariables {
  @PrimaryGeneratedColumn('uuid')
  
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  large_description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'float' })
  discount_price: number;

  @Column({ type: 'numeric' })
  discount_percent: number;

  @Column({ type: 'integer' })
  installment_count: number;

  @Column({ type: 'float' })
  installment_value: number;

  @Column({ type: 'varchar', length: 255 })
  sku: string;

  @Column()
  quantity: number;

  @Column()
  size: string;

  @Column()
  image_link: string;

  @Column()
  product_id: string;

  @Column()
  type: string;

  @Column()
  weight: number;

  @Column()
  format: string;

  @Column()
  length: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  diameter: number;

  @ManyToOne(() => Product, (product) => product.product_variables)
  product: Product;
}
