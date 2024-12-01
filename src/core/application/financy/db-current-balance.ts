import { FinancyTypeOrmRepository } from '@/infra/db/typeorm/repositories/financy-typeorm.repository';
import { GetBalanceDto } from '@/presentation/dtos/financy/get-balance.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class DbCurrentBalace {
  constructor(private readonly financyRepository: FinancyTypeOrmRepository) {}

  async getCurrentFinancy({ startDate, endDate }: GetBalanceDto): Promise<{
    currentBalance: number,
    cashIn: number,
    cashOut: number
  }> {
    try {
      return await this.financyRepository.getCurrentBalance(startDate, endDate);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
