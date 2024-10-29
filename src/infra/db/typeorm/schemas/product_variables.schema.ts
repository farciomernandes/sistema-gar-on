import { EntitySchema } from 'typeorm';

import { ProductVariables } from '@/core/domain/models/product_variables.entity';

export const ProductVariablesSchema = new EntitySchema<ProductVariables>({
  name: ProductVariables.name,
  target: ProductVariables,
  tableName: `product_variables`,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    description: {
      type: 'text',
      nullable: false,
    },
    large_description: {
      type: 'text',
      nullable: false,
    },
    price: {
      type: 'numeric',
      nullable: false,
    },
    installment_value: {
      type: 'integer',
      nullable: false,
    },
    installment_count: {
      type: 'integer',
      nullable: false,
    },
    discount_price: {
      type: 'numeric',
      nullable: false,
    },
    discount_percent: {
      type: 'numeric',
      nullable: false,
    },
    sku: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    quantity: {
      type: 'int',
    },
    size: {
      type: 'varchar',
    },
    image_link: {
      type: 'varchar',
      nullable: false,
    },
    product_id: {
      type: 'uuid',
      nullable: false,
    },
    type: {
      type: 'varchar',
    },
    weight: {
      type: 'int',
    },
    format: {
      type: 'varchar',
    },
    length: {
      type: 'int',
    },
    height: {
      type: 'int',
    },
    width: {
      type: 'int',
    },
    diameter: {
      type: 'int',
    },
  },
  relations: {
    product: {
      type: 'many-to-one',
      target: 'Product',
      joinColumn: { name: 'product_id' },
    },
  },
});
