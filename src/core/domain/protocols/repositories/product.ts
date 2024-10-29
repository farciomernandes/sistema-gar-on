import { Injectable } from '@nestjs/common';
import { Product } from '@/core/domain/models/product.entity';
import { IDbAddProductRepository } from '../db/product/add-product-repository';
import { IDbListProductRepository } from '../db/product/list-product-respository';
import { IDbUpdateProductRepository } from '../db/product/update-product-repository';
import { IDbFindProductByIdRepository } from '../db/product/find-product-by-id-repository';
import { IDbDeleteProductRepository } from '../db/product/delete-product-repository';
import { AddProductModelDto } from '@/presentation/dtos/product/add-product.dto';
import { GetAllProductsDto } from '@/presentation/dtos/product/product-model.dto';
import { UpdateProductModelDto } from '@/presentation/dtos/product/update-product.dto';
import { IDbFindProductByNameRepository } from '../db/product/find-product-by-name-repository';
import { ProductParamsDTO } from '@/presentation/dtos/product/params-product.dto';

@Injectable()
export abstract class ProductRepository
  implements
    IDbAddProductRepository,
    IDbListProductRepository,
    IDbUpdateProductRepository,
    IDbFindProductByIdRepository,
    IDbFindProductByNameRepository,
    IDbDeleteProductRepository
{
  abstract findById(id: string): Promise<Product>;
  abstract findByName(name: string): Promise<Product>;
  abstract getAll(params: ProductParamsDTO, isAdmin: boolean): Promise<GetAllProductsDto>;
  abstract create(payload: AddProductModelDto): Promise<Product>;
  abstract delete(id: string): Promise<void>;
  abstract update(payload: UpdateProductModelDto, id: string): Promise<Product>;
}
