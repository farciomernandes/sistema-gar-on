import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';
import { SchemasEnum } from '../../schema.enum';
import { Category } from '@/core/domain/models/category.entity';

export const CategorySchema = new EntitySchema<Category>({
  name: Category.name,
  target: Category,
  tableName: `categories`,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
      nullable: false,
    },
  },
});
