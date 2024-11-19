import { Table } from '@/core/domain/models/table.entity';
import { TableTypeOrmRepository } from '@/infra/db/typeorm/repositories/table-typeorm.repository';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class DbAddTable {
  constructor(
    private readonly tableRepository: TableTypeOrmRepository,
  ) {}

  async create(
    num: number,
  ): Promise<Table> {
    try {

      return await this.tableRepository.create(num);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
