import { IDbListCategoryRepository } from '@/core/domain/protocols/db/category/list-category-respository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Category } from '@/core/domain/models/category.entity';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';

@Injectable()
export class DbListCategory implements IDbListCategoryRepository {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.getAll();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
