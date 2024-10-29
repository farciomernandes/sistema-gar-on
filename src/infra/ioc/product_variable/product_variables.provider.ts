import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { S3Storage } from '@/infra/proxy/s3-storage';
import { ConfigService } from '@nestjs/config';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { ProductTypeOrmRepository } from '@/infra/db/typeorm/repositories/product-typeorm.repository';
import { Product } from '@/core/domain/models/product.entity';
import { DbAddProductVariables } from '@/core/application/product-variables/db-add-product_variables';
import { DbListProductVariables } from '@/core/application/product-variables/db-list-product_variables';
import { DbDeleteProductVariables } from '@/core/application/product-variables/db-delete-product_variables';
import { DbUpdateProductVariables } from '@/core/application/product-variables/db-update-product_variables';
import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { ProductVariablesTypeOrmRepository } from '@/infra/db/typeorm/repositories/product_variables-typeorm.repository';
import { IDbAddProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/add-product_variables-repository';
import { IDbListProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/list-product_variables-respository';
import { IDbUpdateProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/update-product_variable-repository';
import { IDbDeleteProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/delete-product_variables-repository';
import { S3Repository } from '@/core/domain/protocols/aws/s3-repository';

export const productVariablesProvider: Provider[] = [
  DbAddProductVariables,
  DbListProductVariables,
  DbDeleteProductVariables,
  DbUpdateProductVariables,
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
    provide: IDbAddProductVariablesRepository,
    useClass: DbAddProductVariables,
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
    provide: IDbAddProductVariablesRepository,
    useFactory: (
      ProductVariablesRepository: ProductVariablesRepository,
      productRepository: ProductRepository,
      s3Repository: S3Repository,
    ): DbAddProductVariables => {
      return new DbAddProductVariables(
        ProductVariablesRepository,
        productRepository,
        s3Repository,
      );
    },
    inject: [
      ProductVariablesTypeOrmRepository,
      ProductTypeOrmRepository,
      S3Storage,
    ],
  },
  {
    provide: IDbListProductVariablesRepository,
    useFactory: (
      ProductVariablesRepository: ProductVariablesRepository,
    ): DbListProductVariables => {
      return new DbListProductVariables(ProductVariablesRepository);
    },
    inject: [ProductVariablesTypeOrmRepository],
  },
  {
    provide: IDbUpdateProductVariablesRepository,
    useFactory: (
      productVariablesRepository: ProductVariablesRepository,
      s3Repository: S3Repository,
    ): DbUpdateProductVariables => {
      return new DbUpdateProductVariables(
        productVariablesRepository,
        s3Repository,
      );
    },
    inject: [ProductVariablesTypeOrmRepository, S3Storage],
  },
  {
    provide: IDbDeleteProductVariablesRepository,
    useFactory: (
      ProductVariablesRepository: ProductVariablesRepository,
    ): DbDeleteProductVariables => {
      return new DbDeleteProductVariables(ProductVariablesRepository);
    },
    inject: [ProductVariablesTypeOrmRepository],
  },
];
