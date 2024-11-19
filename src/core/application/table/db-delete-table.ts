import { TableTypeOrmRepository } from '@/infra/db/typeorm/repositories/table-typeorm.repository';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class DbDeleteTable {
  constructor(
    private readonly tableRepository: TableTypeOrmRepository,
  ) {}

  async delete(id: string): Promise<void> {
    try {

      await this.tableRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
