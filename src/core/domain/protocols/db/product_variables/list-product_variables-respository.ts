import { ProductVariables } from '@/core/domain/models/product_variables.entity';

export abstract class IDbListProductVariablesRepository {
  abstract getAll(): Promise<ProductVariables[]>;
}
