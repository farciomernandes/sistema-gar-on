import { Module } from '@nestjs/common';
import { tableProvider } from './table.provider';
import { DbListTable } from '@/core/application/table/db-list-table';
import { DbAddTable } from '@/core/application/table/db-add-table';
import { DbDeleteTable } from '@/core/application/table/db-delete-table';
import { TableTypeOrmRepository } from '@/infra/db/typeorm/repositories/table-typeorm.repository';
import { TableController } from '@/presentation/controllers/table/table-controller';

@Module({
  imports: [],
  providers: [...tableProvider],
  controllers: [TableController],
  exports: [
    DbListTable,
    DbAddTable,
    DbDeleteTable,
    TableTypeOrmRepository,
  ],
})
export class TableModule {}
