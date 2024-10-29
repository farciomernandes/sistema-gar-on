import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Category } from './category.entity';
import { ProductVariables } from './product_variables.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: string;

  @OneToMany(
    () => ProductVariables,
    (product_variables) => product_variables.product,
  )
  product_variables: ProductVariables[];

}
