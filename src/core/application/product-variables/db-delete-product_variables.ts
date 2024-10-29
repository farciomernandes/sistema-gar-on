import { IDbDeleteProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/delete-product_variables-repository';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class DbDeleteProductVariables
  implements IDbDeleteProductVariablesRepository
{
  constructor(
    private readonly productVariablesRepository: ProductVariablesRepository,
  ) {}

  async delete(id: string): Promise<void> {
    try {
      const alreadyExists = await this.productVariablesRepository.findById(id);

      if (!alreadyExists) {
        throw new BadRequestException(`ProductVariables not found`);
      }
      await this.productVariablesRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
