import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbAddCategoryRepository } from '@/core/domain/protocols/db/category/add-category-repository';
import { Category } from '@/core/domain/models/category.entity';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';
import { AddCategoryDto } from '@/presentation/dtos/category/add-category.dto';

@Injectable()
export class DbAddCategory implements IDbAddCategoryRepository {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(
    payload: AddCategoryDto,
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

      return await this.categoryRepository.create({
        ...payload,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
