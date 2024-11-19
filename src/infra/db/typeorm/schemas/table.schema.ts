import { EntitySchema } from 'typeorm';
import { Table } from '@/core/domain/models/table.entity';

export const TablesSchema = new EntitySchema<Table>({
  name: Table.name,
  target: Table,
  tableName: `tables`,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    numberTable: {
      type: 'int',
      nullable: false,
    },
  },
});
