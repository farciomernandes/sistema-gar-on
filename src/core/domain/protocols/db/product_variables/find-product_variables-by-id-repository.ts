import { ProductVariablesModel } from '@/presentation/dtos/product_variable/product_variables-model.dto';

export abstract class IDbFindProductVariableByIdRepository {
  abstract findById(id: string): Promise<ProductVariablesModel>;
}
