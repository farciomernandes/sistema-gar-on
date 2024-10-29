import { Product } from '@/core/domain/models/product.entity';
import { UpdateProductModelDto } from '@/presentation/dtos/product/update-product.dto';

export abstract class IDbUpdateProductRepository {
  abstract update(payload: UpdateProductModelDto, id: string): Promise<Product>;
}
