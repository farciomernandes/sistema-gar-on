import { BadRequestException, Injectable } from '@nestjs/common';
import { IDbUpdateProductRepository } from '@/core/domain/protocols/db/product/update-product-repository';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { CategoryRepository } from '@/core/domain/protocols/repositories/category';
import { UpdateProductModelDto } from '@/presentation/dtos/product/update-product.dto';

@Injectable()
export class DbUpdateProduct implements IDbUpdateProductRepository {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
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
