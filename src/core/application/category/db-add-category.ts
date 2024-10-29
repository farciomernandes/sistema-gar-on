import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbAddCategoryRepository } from '@/core/domain/protocols/db/category/add-category-repository';
import { Category } from '@/core/domain/models/category.entity';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';
import { AddCategoryDto } from '@/presentation/dtos/category/add-category.dto';
import { S3Repository } from '@/core/domain/protocols/aws/s3-repository';

@Injectable()
export class DbAddCategory implements IDbAddCategoryRepository {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly s3Repository: S3Repository,
  ) {}

  async create(
    payload: Omit<AddCategoryDto, 'image_link'>,
    image_link: any,
  ): Promise<Category> {
    try {
      const alreadyExists = await this.categoryRepository.findByName(
        payload.name,
      );

      if (alreadyExists) {
        throw new BadRequestException(
          `Category with ${payload.name} name already exists`,
        );
      }
      const objectUrl = await this.s3Repository.saveFile(image_link);

      return await this.categoryRepository.create({
        ...payload,
        image_link: objectUrl,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
