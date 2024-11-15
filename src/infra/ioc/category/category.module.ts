import { Module } from '@nestjs/common';
import { categoryProvider } from './category.provider';
import { IDbListCategoryRepository } from '@/core/domain/protocols/db/category/list-category-respository';
import { IDbDeleteCategoryRepository } from '@/core/domain/protocols/db/category/delete-category-repository';
import { IDbUpdateCategoryRepository } from '@/core/domain/protocols/db/category/update-category-repository';
import { CategoryController } from '@/presentation/controllers/category/category-controller';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';

@Module({
  imports: [],
  providers: [...categoryProvider],
  controllers: [CategoryController],
  exports: [
    IDbListCategoryRepository,
    IDbDeleteCategoryRepository,
    IDbUpdateCategoryRepository,
    CategoryRepository,
  ],
})
export class CategoryModule {}
