import { FinancyTypeOrmRepository } from '@/infra/db/typeorm/repositories/financy-typeorm.repository';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class DbDeleteFinancy {
  constructor(
    private readonly financyRepository: FinancyTypeOrmRepository,
  ) {}

  async delete(id: string): Promise<void> {
    try {
      const Financy = await this.financyRepository.findById(id);

      if (!Financy) {
        throw new BadRequestException(`Financy not found`);
      }
 

      await this.financyRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
