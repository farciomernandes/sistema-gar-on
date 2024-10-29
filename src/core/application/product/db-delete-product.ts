import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbDeleteProductRepository } from '@/core/domain/protocols/db/product/delete-product-repository';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';

@Injectable()
export class DbDeleteProduct implements IDbDeleteProductRepository {
  constructor(private readonly productRepository: ProductRepository) {}

  async delete(id: string): Promise<void> {
    try {
      const alreadyExists = await this.productRepository.findById(id);

      if (!alreadyExists) {
        throw new BadRequestException(`Product not found`);
      }
      await this.productRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
