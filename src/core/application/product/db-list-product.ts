import { IDbListProductRepository } from '@/core/domain/protocols/db/product/list-product-respository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { GetAllProductsDto } from '@/presentation/dtos/product/product-model.dto';
import { ProductParamsDTO } from '@/presentation/dtos/product/params-product.dto';

@Injectable()
export class DbListProduct implements IDbListProductRepository {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAll(queryParams: ProductParamsDTO, isAdmin?: boolean): Promise<GetAllProductsDto> {
    try {
      const response = await this.productRepository.getAll(queryParams, isAdmin);

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
