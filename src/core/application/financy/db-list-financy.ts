import { Financy } from '@/core/domain/models/finance.entity';
import { FinancyTypeOrmRepository } from '@/infra/db/typeorm/repositories/financy-typeorm.repository';
import { GetBalanceDto } from '@/presentation/dtos/financy/get-balance.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class DbListFinancy {
  constructor(private readonly financyRepository: FinancyTypeOrmRepository) {}

  async getAll(payload: GetBalanceDto): Promise<Financy[]> {
    try {
      return await this.financyRepository.getAll(payload);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
