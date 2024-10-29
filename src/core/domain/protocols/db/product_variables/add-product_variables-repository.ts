import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { AddProductVariablesModel } from '@/presentation/dtos/product_variable/add-product_variables.dto';

export abstract class IDbAddProductVariablesRepository {
  abstract create(
    payload: Omit<AddProductVariablesModel, 'image_link'>,
    image_link: any
  ): Promise<ProductVariables>;
}
