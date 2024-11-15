import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbDeleteCategoryRepository } from '@/core/domain/protocols/db/category/delete-category-repository';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';

@Injectable()
export class DbDeleteCategory implements IDbDeleteCategoryRepository {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async delete(id: string): Promise<void> {
    try {
      const category = await this.categoryRepository.findById(id);

      if (!category) {
        throw new BadRequestException(`Category not found`);
      }
 

      await this.categoryRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
