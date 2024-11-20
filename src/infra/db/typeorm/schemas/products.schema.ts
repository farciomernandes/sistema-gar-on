import { EntitySchema } from 'typeorm';
import { Product } from '@/core/domain/models/product.entity';
import { Category } from '@/core/domain/models/category.entity';

export const ProductsSchema = new EntitySchema<Product>({
  name: Product.name,
  target: Product,
  tableName: `products`,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    name: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    description: {
      type: 'text',
      nullable: false,
    },
    is_snack: {
      type: 'numeric',
      nullable: true,
    },
    price: {
      type: 'numeric',
      nullable: false,
    },
    quantity: {
      type: 'numeric',
      nullable: true,
    },
    unit: {
      type: 'varchar',
    },
    category_id: {
      type: 'uuid',
      nullable: false,
    },
  },
  relations: {
    category: {
      type: 'many-to-one',
      target: () => Category,
      joinColumn: { name: 'category_id' },
      eager: true,
    },
  },
});
