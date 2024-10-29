import { Category } from '@/core/domain/models/category.entity';
import { UpdateCategoryDto } from '@/presentation/dtos/category/update-category.dto';

export abstract class IDbUpdateCategoryRepository {
  abstract update(
    payload: Omit<UpdateCategoryDto, 'image_link'>,
    id: string,
    image_link: any
  ): Promise<Category>;
}
