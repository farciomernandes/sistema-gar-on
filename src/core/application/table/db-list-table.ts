import { Table } from "@/core/domain/models/table.entity";
import { TableTypeOrmRepository } from "@/infra/db/typeorm/repositories/table-typeorm.repository";
import { Injectable, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class DbListTable {
  constructor(private readonly tableRepository: TableTypeOrmRepository) {}

  async getAll(): Promise<Table[]> {
    try {
      return await this.tableRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
