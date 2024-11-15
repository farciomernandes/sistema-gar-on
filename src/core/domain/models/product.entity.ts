import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Category } from './category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  unit: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column()
  category_id: string;

}
