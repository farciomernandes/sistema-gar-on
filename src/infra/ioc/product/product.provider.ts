import { Provider } from '@nestjs/common';
import { ProductTypeOrmRepository } from '../../db/typeorm/repositories/product-typeorm.repository';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IDbDeleteProductRepository } from '@/core/domain/protocols/db/product/delete-product-repository';
import { IDbAddProductRepository } from '@/core/domain/protocols/db/product/add-product-repository';
import { IDbListProductRepository } from '@/core/domain/protocols/db/product/list-product-respository';
import { IDbUpdateProductRepository } from '@/core/domain/protocols/db/product/update-product-repository';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { DbAddProduct } from '@/core/application/product/db-add-product';
import { DbDeleteProduct } from '@/core/application/product/db-delete-product';
import { DbListProduct } from '@/core/application/product/db-list-product';
import { DbUpdateProduct } from '@/core/application/product/db-update-product';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';
import { CategoryTypeOrmRepository } from '@/infra/db/typeorm/repositories/category-typeorm.repository';
import { Category } from '@/core/domain/models/category.entity';
import { ProductVariablesTypeOrmRepository } from '@/infra/db/typeorm/repositories/product_variables-typeorm.repository';
import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';

export const productProvider: Provider[] = [
  DbAddProduct,
  DbListProduct,
  DbDeleteProduct,
  DbUpdateProduct,
  {
    provide: ProductTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new ProductTypeOrmRepository(dataSource.getRepository(Product));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: ProductRepository,
    useClass: ProductTypeOrmRepository,
  },
  {
    provide: ProductVariablesTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new ProductVariablesTypeOrmRepository(
        dataSource.getRepository(ProductVariables),
      );
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: ProductVariablesRepository,
    useClass: ProductVariablesTypeOrmRepository,
  },
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
    provide: IDbAddProductRepository,
    useFactory: (
      productRepository: ProductRepository,
      categoryRepository: CategoryRepository,
    ): DbAddProduct => {
      return new DbAddProduct(productRepository, categoryRepository);
    },
    inject: [ProductTypeOrmRepository, CategoryTypeOrmRepository],
  },
  {
    provide: IDbListProductRepository,
    useFactory: (productRepository: ProductRepository): DbListProduct => {
      return new DbListProduct(productRepository);
    },
    inject: [ProductTypeOrmRepository],
  },
  {
    provide: IDbUpdateProductRepository,
    useFactory: (
      productRepository: ProductRepository,
      categoryRepository: CategoryRepository,
      productVariablesRepository: ProductVariablesRepository,
    ): DbUpdateProduct => {
      return new DbUpdateProduct(productRepository, categoryRepository, productVariablesRepository);
    },
    inject: [ProductTypeOrmRepository, CategoryTypeOrmRepository, ProductVariablesTypeOrmRepository],
  },
  {
    provide: IDbDeleteProductRepository,
    useFactory: (productRepository: ProductRepository): DbDeleteProduct => {
      return new DbDeleteProduct(productRepository);
    },
    inject: [ProductTypeOrmRepository],
  },
];
