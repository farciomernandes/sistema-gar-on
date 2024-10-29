import { EntitySchema } from 'typeorm';
import { SchemasEnum } from '../../schema.enum';
import { Product } from '@/core/domain/models/product.entity';
import { Category } from '@/core/domain/models/category.entity';
import { ProductVariables } from '@/core/domain/models/product_variables.entity';

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
    product_variables: {
      type: 'one-to-many',
      target: () => ProductVariables,
      inverseSide: 'product',
      eager: true,
    },
  },
});
