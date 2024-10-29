import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { IDbAddProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/add-product_variables-repository';
import { AddProductVariablesModel } from '@/presentation/dtos/product_variable/add-product_variables.dto';
import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { S3Repository } from '@/core/domain/protocols/aws/s3-repository';

@Injectable()
export class DbAddProductVariables implements IDbAddProductVariablesRepository {
  constructor(
    private readonly productVariablesRepository: ProductVariablesRepository,
    private readonly productRepository: ProductRepository,
    private readonly s3Repository: S3Repository,
  ) {}

  async create(
    payload: Omit<AddProductVariablesModel, 'image_link'>,
    image_link: any,
  ): Promise<ProductVariables> {
    try {
      const alreadyExists = await this.productRepository.findById(
        payload.product_id,
      );

      if (!alreadyExists) {
        throw new BadRequestException(
          `Product with ${payload.product_id} id not found.`,
        );
      }
      const objectUrl = await this.s3Repository.saveFile(image_link);

      return this.productVariablesRepository.create({
        ...payload,
        image_link: objectUrl,
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
