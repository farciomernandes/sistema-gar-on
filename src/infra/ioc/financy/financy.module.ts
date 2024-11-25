import { Module } from '@nestjs/common';
import { financyProvider } from './financy.provider';
import { DbListFinancy } from '@/core/application/financy/db-list-financy';
import { DbDeleteFinancy } from '@/core/application/financy/db-delete-financy';
import { DbUpdateFinancy } from '@/core/application/financy/db-update-financy';
import { FinancyTypeOrmRepository } from '@/infra/db/typeorm/repositories/financy-typeorm.repository';
import { FinancyController } from '@/presentation/controllers/financy/financy-controller';
import { DbCurrentBalace } from '@/core/application/financy/db-current-balance';

@Module({
  imports: [],
  providers: [...financyProvider],
  controllers: [FinancyController],
  exports: [
    DbListFinancy,
    DbDeleteFinancy,
    DbUpdateFinancy,
    DbCurrentBalace,
    FinancyTypeOrmRepository,
  ],
})
export class FinancyModule {}
