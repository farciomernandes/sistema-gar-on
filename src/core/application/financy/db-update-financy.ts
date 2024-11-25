import { Financy } from '@/core/domain/models/finance.entity';
import { FinancyTypeOrmRepository } from '@/infra/db/typeorm/repositories/financy-typeorm.repository';
import { AddFinancyModelDto } from '@/presentation/dtos/financy/add-financy.dto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class DbUpdateFinancy {
  constructor(
    private readonly financyRepository: FinancyTypeOrmRepository,
  ) {}

  async update(
    payload: AddFinancyModelDto,
    id: string,
  ): Promise<Financy> {
    try {
      const alreadyExists = await this.financyRepository.findById(id);

      if (!alreadyExists) {
        throw new BadRequestException(`Financy with ${id} id not found.`);
      }
      return await this.financyRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'Financy not found') {
        throw new BadRequestException(`Financy not found`);
      } else {
        throw error;
      }
    }
  }
}
