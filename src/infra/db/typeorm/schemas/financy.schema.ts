import { Financy } from '@/core/domain/models/finance.entity';
import { EntitySchema } from 'typeorm/entity-schema/EntitySchema';

export const FinancySchema = new EntitySchema<Financy>({
  name: Financy.name,
  target: Financy,
  tableName: `financies`,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    description: {
      type: 'varchar',
      nullable: true,
    },
    type: {
      type: 'varchar',
      nullable: false,
    },
    value: {
      type: 'numeric',
      nullable: false,
    },
    transaction_date: {
      type: 'text',
      nullable: false,
    }
  },
});
