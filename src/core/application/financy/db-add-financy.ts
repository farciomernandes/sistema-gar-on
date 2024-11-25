import { Financy } from '@/core/domain/models/finance.entity';
import { FinancyTypeOrmRepository } from '@/infra/db/typeorm/repositories/financy-typeorm.repository';
import { AddFinancyModelDto } from '@/presentation/dtos/financy/add-financy.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class DbAddFinancy {
  constructor(
    private readonly financyRepository: FinancyTypeOrmRepository,
  ) {}

  async create(
    payload: AddFinancyModelDto,
  ): Promise<Financy> {
    try {

      return await this.financyRepository.create({
        ...payload,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
