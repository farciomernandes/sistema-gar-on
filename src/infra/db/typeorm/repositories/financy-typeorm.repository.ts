import { Financy } from '@/core/domain/models/finance.entity';
import { AddFinancyModelDto } from '@/presentation/dtos/financy/add-financy.dto';
import { GetBalanceDto } from '@/presentation/dtos/financy/get-balance.dto';
import { Repository } from 'typeorm';

export class FinancyTypeOrmRepository{
  constructor(private readonly financyRepository: Repository<Financy>) {}
  async update(
    payload: AddFinancyModelDto,
    id: string,
  ): Promise<Financy> {
    try {
      const Financy = await this.financyRepository.findOneOrFail({
        where: { id },
      });

      const updateFinancy = {
        ...payload,
      };

      this.financyRepository.merge(Financy, updateFinancy);
      return this.financyRepository.save(Financy);
    } catch (error) {
      throw new Error('Error to update Financy');
    }
  }

  async findById(id: string): Promise<Financy> {
    return this.financyRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.financyRepository.delete(id);
  }

  async getAll({ startDate, endDate }: GetBalanceDto): Promise<Financy[]> {
    try {
      const queryBuilder = this.financyRepository.createQueryBuilder('financy');
      let start, end;
      
      if (startDate && endDate) {
        start = new Date(startDate);
        end = new Date(endDate);
        
        if (start > end) {
          [start, end] = [end, start];
        }
  
        queryBuilder.where('financy.transaction_date BETWEEN :start AND :end', { 
          start: start.toISOString(),
          end: end.toISOString(),
        });
      } 
      else if (startDate) {
        start = new Date(startDate);
        queryBuilder.where('financy.transaction_date >= :start', { start: start.toISOString() });
      } 
      else if (endDate) {
        end = new Date(endDate);
        queryBuilder.where('financy.transaction_date <= :end', { end: end.toISOString() });
      }
  
      const response = await queryBuilder.getMany();
  
      return response;
    } catch (error) {
      console.error('Error fetching finances:', error);
      throw new Error('Error fetching finances');
    }
  }
  
  
  async create(payload: AddFinancyModelDto): Promise<Financy> {

    const financy = this.financyRepository.create(payload);
    

    return this.financyRepository.save(financy);
  }

  async getCurrentBalance(startDate?: string, endDate?: string): Promise<{
    currentBalance: number,
    cashIn: number,
    cashOut: number
  }> {
    try {
      if ((startDate && !endDate) || (!startDate && endDate)) {
        throw new Error('Both startDate and endDate must be provided or neither');
      }
  
      const queryBuilder = this.financyRepository.createQueryBuilder('financy');
      let start, end;
  
      if (startDate && endDate) {
        start = new Date(startDate);
        end = new Date(endDate);
  
        if (start > end) {
          [start, end] = [end, start];
        }
  
        queryBuilder.where('financy.transaction_date BETWEEN :start AND :end', { 
          start: start.toISOString(),
          end: end.toISOString(),
        });
      } 
      else if (startDate) {
        start = new Date(startDate);
        queryBuilder.where('financy.transaction_date >= :start', { start: start.toISOString() });
      } 
      else if (endDate) {
        end = new Date(endDate);
        queryBuilder.where('financy.transaction_date <= :end', { end: end.toISOString() });
      }
  
      const finances = await queryBuilder.getMany();
  
      console.log(finances);
  
      let currentBalance = 0;
      let cashIn = 0;
      let cashOut = 0;
  
      for (const finance of finances) {
        if (finance.type === 'INCOME') {
          cashIn += finance.value;
          currentBalance += finance.value;
        } else if (finance.type === 'OUTCOME') {
          cashOut += finance.value;
          currentBalance -= finance.value;
        }
      }
  
      return {
        currentBalance,
        cashIn,
        cashOut,
      };
    } catch (error) {
      throw new Error('Error calculating current balance: ' + error.message);
    }
  }
  
  
  
}
