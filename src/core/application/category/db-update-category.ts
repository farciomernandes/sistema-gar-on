import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateCategoryRepository } from '@/core/domain/protocols/db/category/update-category-repository';
import { Category } from '@/core/domain/models/category.entity';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';
import { UpdateCategoryDto } from '@/presentation/dtos/category/update-category.dto';

@Injectable()
export class DbUpdateCategory implements IDbUpdateCategoryRepository {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async update(
    payload: UpdateCategoryDto,
    id: string,
  ): Promise<Category> {
    try {
      const alreadyExists = await this.categoryRepository.findById(id);

      if (!alreadyExists) {
        throw new BadRequestException(`Category with ${id} id not found.`);
      }
      return await this.categoryRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'Category not found') {
        throw new BadRequestException(`Category not found`);
      } else {
        throw error;
      }
    }
  }
}
