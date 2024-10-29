import { Category } from '@/core/domain/models/category.entity';

export abstract class IDbListCategoryRepository {
  abstract getAll(): Promise<Category[]>;
}
