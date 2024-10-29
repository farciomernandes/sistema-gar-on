import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { IDbListProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/list-product_variables-respository';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbListProductVariables
  implements IDbListProductVariablesRepository
{
  constructor(
    private readonly productVariablesRepository: ProductVariablesRepository,
  ) {}

  async getAll(): Promise<ProductVariables[]> {
    try {
      return this.productVariablesRepository.getAll();
    } catch (error) {
      throw error;
    }
  }
}
