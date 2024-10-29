import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { ProductVariablesRepository } from '@/core/domain/protocols/repositories/product_variable';
import { AddProductVariablesModel } from '@/presentation/dtos/product_variable/add-product_variables.dto';
import { ProductVariablesModel } from '@/presentation/dtos/product_variable/product_variables-model.dto';
import { UpdateProductVariablesModel } from '@/presentation/dtos/product_variable/update-product_variables.dto';
import { Repository } from 'typeorm';

export class ProductVariablesTypeOrmRepository
  implements ProductVariablesRepository
{
  constructor(
    private readonly productVariablesRepository: Repository<ProductVariables>,
  ) {}

  async update(
    payload: UpdateProductVariablesModel,
    id: string,
    image_link?: string,
  ): Promise<ProductVariables> {
    try {
      const productVariables =
        await this.productVariablesRepository.findOneOrFail({
          where: { id },
        });

      const updateProductvariable = {
        ...payload,
        image_link,
      };

      this.productVariablesRepository.merge(
        productVariables,
        updateProductvariable,
      );

      const save = await this.productVariablesRepository.save(productVariables);
      return save;
    } catch (error) {
      throw new Error('Error to update ProductVariables');
    }
  }

  async findById(id: string): Promise<ProductVariablesModel> {
    const queryBuilder =
      this.productVariablesRepository.createQueryBuilder('product_variables');
    queryBuilder.where('product_variables.id = :id', { id });

    queryBuilder.leftJoinAndSelect('product_variables.product', 'product');

    const product = await queryBuilder.getOne();

    return ProductVariablesModel.toDto(product);
  }
  async delete(id: string): Promise<void> {
    await this.productVariablesRepository.delete(id);
  }

  async getAll(): Promise<ProductVariables[]> {
    return this.productVariablesRepository.find();
  }

  async create(
    payload: Omit<AddProductVariablesModel, 'image_link'>,
  ): Promise<ProductVariables> {
    const ProductVariables = this.productVariablesRepository.create(payload);
    return this.productVariablesRepository.save(ProductVariables);
  }
}
