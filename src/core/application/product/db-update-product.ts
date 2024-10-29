import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateProductRepository } from '@/core/domain/protocols/db/product/update-product-repository';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';
import { UpdateProductModelDto } from '@/presentation/dtos/product/update-product.dto';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';

@Injectable()
export class DbUpdateProduct implements IDbUpdateProductRepository {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly productVariablesRepository: ProductVariablesRepository,
  ) {}

  async update(payload: UpdateProductModelDto, id: string): Promise<Product> {
    try {
      const category = await this.categoryRepository.findById(payload.category_id);
      if (!category) {
        throw new BadRequestException(`Category with id ${payload.category_id} not found!`);
      }

      const product = await this.productRepository.findById(id);
      if (!product) {
        throw new BadRequestException('Product not found');
      }

      const existingProductVariables = product.product_variables.map(variable => variable.id);

      if (payload.product_variables) {
        const payloadVariableIds = payload.product_variables.map(variable => variable.id);

        const variablesToRemove = existingProductVariables.filter(variableId => 
          !payloadVariableIds.includes(variableId)
        );

        if (variablesToRemove.length > 0) {
          await Promise.all(variablesToRemove.map(variableId =>
            this.productVariablesRepository.delete(variableId)
          ));
        }
      } else {
        if (existingProductVariables.length > 0) {
          await Promise.all(existingProductVariables.map(variableId =>
            this.productVariablesRepository.delete(variableId)
          ));
        }
      }

      await this.productRepository.update(payload, id);

      return await this.productRepository.findById(id);

    } catch (error) {
      if (error.message === 'Product not found') {
        throw new BadRequestException('Product not found');
      } else {
        throw error;
      }
    }
  }
}
