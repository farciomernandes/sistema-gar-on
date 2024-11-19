import { Table } from '@/core/domain/models/table.entity';
import { Repository } from 'typeorm';

export class TableTypeOrmRepository{
  constructor(private readonly tableRepository: Repository<Table>) {}


  async delete(id: string): Promise<void> {
    await this.tableRepository.delete(id);
  }

  async getAll(): Promise<Table[]> {
    return this.tableRepository.find();
  }

  async create(num:number): Promise<Table> {

    const table = this.tableRepository.create({
      numberTable: num,
    });

    return this.tableRepository.save(table);
  }
}
