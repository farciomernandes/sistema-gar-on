import { DbAddFinancy } from '@/core/application/financy/db-add-financy';
import { DbCurrentBalace } from '@/core/application/financy/db-current-balance';
import { DbDeleteFinancy } from '@/core/application/financy/db-delete-financy';
import { DbListFinancy } from '@/core/application/financy/db-list-financy';
import { DbUpdateFinancy } from '@/core/application/financy/db-update-financy';
import { Financy } from '@/core/domain/models/finance.entity';
import { FinancyTypeOrmRepository } from '@/infra/db/typeorm/repositories/financy-typeorm.repository';
import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const financyProvider: Provider[] = [
  DbListFinancy,
  DbDeleteFinancy,
  DbUpdateFinancy,
  DbAddFinancy,
  DbCurrentBalace,
  {
    provide: FinancyTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new FinancyTypeOrmRepository(dataSource.getRepository(Financy));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: DbListFinancy,
    useFactory: (financyRepository: FinancyTypeOrmRepository): DbListFinancy => {
      return new DbListFinancy(financyRepository);
    },
    inject: [FinancyTypeOrmRepository],
  },
  {
    provide: DbCurrentBalace,
    useFactory: (
      financyRepository: FinancyTypeOrmRepository,
    ): DbCurrentBalace => {
      return new DbCurrentBalace(financyRepository);
    },
    inject: [FinancyTypeOrmRepository],
  },
  {
    provide: DbUpdateFinancy,
    useFactory: (
      financyRepository: FinancyTypeOrmRepository,
    ): DbUpdateFinancy => {
      return new DbUpdateFinancy(financyRepository);
    },
    inject: [FinancyTypeOrmRepository],
  },
  {
    provide: DbDeleteFinancy,
    useFactory: (
      financyRepository: FinancyTypeOrmRepository,
    ): DbDeleteFinancy => {
      return new DbDeleteFinancy(financyRepository);
    },
    inject: [FinancyTypeOrmRepository],
  },
  {
    provide: DbAddFinancy,
    useFactory: (
      financyRepository: FinancyTypeOrmRepository,
    ): DbAddFinancy => {
      return new DbAddFinancy(financyRepository);
    },
    inject: [FinancyTypeOrmRepository],
  },
];
