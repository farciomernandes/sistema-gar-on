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
import { S3Storage } from '@/infra/proxy/s3-storage';
import { ConfigService } from '@nestjs/config';
import { S3Repository } from '@/core/domain/protocols/aws/s3-repository';

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
    provide: S3Storage,
    useFactory: (configService: ConfigService): S3Storage => {
      return new S3Storage(configService);
    },
    inject: [ConfigService],
  },
  {
    provide: S3Repository,
    useClass: S3Storage,
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
      s3Repository: S3Repository,
    ): DbUpdateCategory => {
      return new DbUpdateCategory(categoryRepository, s3Repository);
    },
    inject: [CategoryTypeOrmRepository, S3Storage],
  },
  {
    provide: IDbDeleteCategoryRepository,
    useFactory: (
      categoryRepository: CategoryRepository,
      s3Repository: S3Repository,
    ): DbDeleteCategory => {
      return new DbDeleteCategory(categoryRepository, s3Repository);
    },
    inject: [CategoryTypeOrmRepository, S3Storage],
  },
  {
    provide: IDbAddCategoryRepository,
    useFactory: (
      categoryRepository: CategoryRepository,
      s3Repository: S3Repository,
    ): DbAddCategory => {
      return new DbAddCategory(categoryRepository, s3Repository);
    },
    inject: [CategoryTypeOrmRepository, S3Storage],
  },
];
