import { Product } from '@/core/domain/models/product.entity';
import { AddProductModelDto } from '@/presentation/dtos/product/add-product.dto';

export abstract class IDbAddProductRepository {
  abstract create(payload: Omit<AddProductModelDto, 'id'>): Promise<Product>;
}
