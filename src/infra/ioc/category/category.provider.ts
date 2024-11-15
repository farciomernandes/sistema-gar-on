import { Provider } from '@nestjs/common';
import { CategoryTypeOrmRepository } from '../../db/typeorm/repositories/category-typeorm.repository';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IDbDeleteCategoryRepository } from '@/core/domain/protocols/db/category/delete-category-repository';
import { IDbListCategoryRepository } from '@/core/domain/protocols/db/category/list-category-respository';
import { IDbUpdateCategoryRepository } from '@/core/domain/protocols/db/category/update-category-repository';
import { Category } from '@/core/domain/models/category.entity';
import { DbListCategory } from '@/core/application/category/db-list-category';
import { DbDeleteCategory } from '@/core/application/category/db-delete-category';
import { DbUpdateCategory } from '@/core/application/category/db-update-category';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';
import { DbAddCategory } from '@/core/application/category/db-add-category';
import { IDbAddCategoryRepository } from '@/core/domain/protocols/db/category/add-category-repository';

export const categoryProvider: Provider[] = [
  DbListCategory,
  DbDeleteCategory,
  DbUpdateCategory,
  DbAddCategory,
  {
    provide: CategoryTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new CategoryTypeOrmRepository(dataSource.getRepository(Category));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: CategoryRepository,
    useClass: CategoryTypeOrmRepository,
  },
  {
    provide: IDbListCategoryRepository,
    useFactory: (categoryRepository: CategoryRepository): DbListCategory => {
      return new DbListCategory(categoryRepository);
    },
    inject: [CategoryTypeOrmRepository],
  },
  {
    provide: IDbUpdateCategoryRepository,
    useFactory: (
      categoryRepository: CategoryRepository,
    ): DbUpdateCategory => {
      return new DbUpdateCategory(categoryRepository);
    },
    inject: [CategoryTypeOrmRepository],
  },
  {
    provide: IDbDeleteCategoryRepository,
    useFactory: (
      categoryRepository: CategoryRepository,
    ): DbDeleteCategory => {
      return new DbDeleteCategory(categoryRepository);
    },
    inject: [CategoryTypeOrmRepository],
  },
  {
    provide: IDbAddCategoryRepository,
    useFactory: (
      categoryRepository: CategoryRepository,
    ): DbAddCategory => {
      return new DbAddCategory(categoryRepository);
    },
    inject: [CategoryTypeOrmRepository],
  },
];
