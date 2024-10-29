import { Category } from '@/core/domain/models/category.entity';
import { AddCategoryDto } from '@/presentation/dtos/category/add-category.dto';

export abstract class IDbAddCategoryRepository {
  abstract create(
    payload: Omit<AddCategoryDto, 'image_link'>,
    image_link: any
  ): Promise<Category>;
}
