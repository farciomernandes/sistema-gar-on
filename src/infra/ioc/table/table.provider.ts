import { DbAddTable } from '@/core/application/table/db-add-table';
import { DbDeleteTable } from '@/core/application/table/db-delete-table';
import { DbListTable } from '@/core/application/table/db-list-table';
import { Table } from '@/core/domain/models/table.entity';
import { TableTypeOrmRepository } from '@/infra/db/typeorm/repositories/table-typeorm.repository';
import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const tableProvider: Provider[] = [
  DbListTable,
  DbDeleteTable,
  DbAddTable,
  {
    provide: TableTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new TableTypeOrmRepository(dataSource.getRepository(Table));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: DbListTable,
    useFactory: (tableRepository: TableTypeOrmRepository): DbListTable => {
      return new DbListTable(tableRepository);
    },
    inject: [TableTypeOrmRepository],
  },
  {
    provide: DbDeleteTable,
    useFactory: (
      tableRepository: TableTypeOrmRepository,
    ): DbDeleteTable => {
      return new DbDeleteTable(tableRepository);
    },
    inject: [TableTypeOrmRepository],
  },
  {
    provide: DbAddTable,
    useFactory: (
      tableRepository: TableTypeOrmRepository,
    ): DbAddTable => {
      return new DbAddTable(tableRepository);
    },
    inject: [TableTypeOrmRepository],
  },
];
