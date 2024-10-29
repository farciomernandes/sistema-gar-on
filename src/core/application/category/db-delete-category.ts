import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbDeleteCategoryRepository } from '@/core/domain/protocols/db/category/delete-category-repository';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';
import { S3Repository } from '@/core/domain/protocols/aws/s3-repository';

@Injectable()
export class DbDeleteCategory implements IDbDeleteCategoryRepository {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly s3Repository: S3Repository,
  ) {}

  async delete(id: string): Promise<void> {
    try {
      const category = await this.categoryRepository.findById(id);

      if (!category) {
        throw new BadRequestException(`Category not found`);
      }
      if (category.image_link) {
        await this.s3Repository.deleteBucket(category.image_link);
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
