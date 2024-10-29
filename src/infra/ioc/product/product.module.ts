import { Module } from '@nestjs/common';
import { productProvider } from './product.provider';
import { IDbAddProductRepository } from '@/core/domain/protocols/db/product/add-product-repository';
import { IDbListProductRepository } from '@/core/domain/protocols/db/product/list-product-respository';
import { IDbDeleteProductRepository } from '@/core/domain/protocols/db/product/delete-product-repository';
import { IDbUpdateProductRepository } from '@/core/domain/protocols/db/product/update-product-repository';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { ProductController } from '@/presentation/controllers/product/product-controller';

@Module({
  imports: [],
  providers: [...productProvider],
  controllers: [ProductController],
  exports: [
    IDbAddProductRepository,
    IDbListProductRepository,
    IDbDeleteProductRepository,
    IDbUpdateProductRepository,
    ProductRepository,
  ],
})
export class ProductModule {}
