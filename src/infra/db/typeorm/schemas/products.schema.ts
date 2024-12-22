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
      nullable: true,
    },
    description: {
      type: 'text',
      nullable: true,
    },
    is_snack: {
      type: 'numeric',
      nullable: true,
    },
    price: {
      type: 'numeric',
      nullable: true,
    },
    quantity: {
      type: 'numeric',
      nullable: true,
    },
    unit: {
      type: 'varchar',
      nullable: true
    },
    size: {
      type: 'varchar',
      nullable: true
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
