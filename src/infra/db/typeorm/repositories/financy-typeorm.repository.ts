import { Financy } from '@/core/domain/models/finance.entity';
import { AddFinancyModelDto } from '@/presentation/dtos/financy/add-financy.dto';
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

  async getAll(): Promise<Financy[]> {
    return this.financyRepository.find();
  }

  async create(payload: AddFinancyModelDto): Promise<Financy> {

    const financy = this.financyRepository.create(payload);
    

    return this.financyRepository.save(financy);
  }

  async getCurrentBalance(startDate?: string, endDate?: string): Promise<number> {
    try {
      const whereCondition: any = {};

      if (startDate) {
        whereCondition.transaction_date = whereCondition.transaction_date || {};
        whereCondition.transaction_date['>='] = startDate;
      }

      if (endDate) {
        whereCondition.transaction_date = whereCondition.transaction_date || {};
        whereCondition.transaction_date['<='] = endDate;
      }

      const finances = await this.financyRepository.find({
        where: whereCondition,
      });

      let currentBalance = 0;

      for (const finance of finances) {
        if (finance.type === 'INCOME') {
          currentBalance += finance.value; 
        } else if (finance.type === 'OUTCOME') {
          currentBalance -= finance.value;
        }
      }

      return currentBalance;
    } catch (error) {
      throw new Error('Error calculating current balance');
    }
  }
}
