import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateCategoryRepository } from '@/core/domain/protocols/db/category/update-category-repository';
import { Category } from '@/core/domain/models/category.entity';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';
import { UpdateCategoryDto } from '@/presentation/dtos/category/update-category.dto';
import { S3Repository } from '@/core/domain/protocols/aws/s3-repository';

@Injectable()
export class DbUpdateCategory implements IDbUpdateCategoryRepository {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly s3Repository: S3Repository,
  ) {}

  async update(
    payload: Omit<UpdateCategoryDto, 'image_link'>,
    id: string,
    image_link: any,
  ): Promise<Category> {
    try {
      const alreadyExists = await this.categoryRepository.findById(id);

      if (!alreadyExists) {
        throw new BadRequestException(`Category with ${id} id not found.`);
      }
      let objectUrl = alreadyExists.image_link;
      if (image_link) {
        await this.s3Repository.deleteBucket(alreadyExists.image_link);
        objectUrl = await this.s3Repository.saveFile(image_link);
      }

      return await this.categoryRepository.update(payload, id, objectUrl);
    } catch (error) {
      if (error.message === 'Category not found') {
        throw new BadRequestException(`Category not found`);
      } else {
        throw error;
      }
    }
  }
}
