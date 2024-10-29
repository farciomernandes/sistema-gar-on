import { Injectable } from '@nestjs/common';
import { Category } from '@/core/domain/models/category.entity';
import { IDbListCategoryRepository } from '../db/category/list-category-respository';
import { IDbUpdateCategoryRepository } from '../db/category/update-category-repository';
import { IDbFindCategoryByIdRepository } from '../db/category/find-category-by-id-repository';
import { IDbDeleteCategoryRepository } from '../db/category/delete-category-repository';
import { IDbFindCategoryByNameRepository } from '../db/category/find-category-by-name-repository';
import { AddCategoryDto } from '@/presentation/dtos/category/add-category.dto';
import { UpdateCategoryDto } from '@/presentation/dtos/category/update-category.dto';

@Injectable()
export abstract class CategoryRepository
  implements
    IDbListCategoryRepository,
    IDbUpdateCategoryRepository,
    IDbFindCategoryByIdRepository,
    IDbFindCategoryByNameRepository,
    IDbDeleteCategoryRepository
{
  abstract findById(id: string): Promise<Category>;
  abstract findByName(name: string): Promise<Category>;
  abstract getAll(): Promise<Category[]>;
  abstract create(payload: AddCategoryDto): Promise<Category>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    payload: Omit<UpdateCategoryDto, 'image_link'>,
    id: string,
    image_link?: any,
  ): Promise<Category>;
}
