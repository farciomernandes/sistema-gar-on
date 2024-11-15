import { Repository } from 'typeorm';
import { Product } from '@/core/domain/models/product.entity';
import { ProductRepository } from '@/core/domain/protocols/repositories/product';
import { AddProductModelDto } from '@/presentation/dtos/product/add-product.dto';
import { UpdateProductModelDto } from '@/presentation/dtos/product/update-product.dto';
import { ProductParamsDTO } from '@/presentation/dtos/product/params-product.dto';
import {
  GetAllProductsDto,
  ProductModelDto,
} from '@/presentation/dtos/product/product-model.dto';

export class ProductTypeOrmRepository implements ProductRepository {
  constructor(private readonly productRepository: Repository<Product>) { }

  async findByName(name: string): Promise<Product> {
    return this.productRepository.findOne({ where: { name } });
  }

  async update(payload: UpdateProductModelDto, id: string): Promise<Product> {
    try {
      const { name, category_id } = payload;

      const query = `
        UPDATE users.products
        SET
          name = COALESCE($1, name), 
          category_id = COALESCE($2, category_id)
        WHERE
          id = $3
      `;

      await this.productRepository.query(query, [name, category_id, id]);

      return this.productRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new Error('Error updating product');
    }
  }

  async findById(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      return product;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async getAll(params: ProductParamsDTO, isAdmin: boolean): Promise<GetAllProductsDto> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
  
    if (params.id) {
      queryBuilder.andWhere('product.id = :id', { id: params.id });
    }
  
    if (params.category_id) {
      queryBuilder.andWhere('product.category_id = :categoryId', {
        categoryId: params.category_id,
      });
    }
  
    if (params.name) {
      queryBuilder.andWhere('product.name ILIKE :name', {
        name: `%${params.name}%`,
      });
    }

    queryBuilder.leftJoinAndSelect('product.category', 'category');
  
    const [products, total] = await queryBuilder
      .take(params.limit)
      .skip(((params.page || 1) - 1) * params.limit).getManyAndCount();
  
    const totalPages = Math.ceil(total / params.limit);
  
    return {
      products: products.map((product) => ProductModelDto.toDto(product)),
      pages: totalPages,
      total,
    };
  }
  

  async create(payload: AddProductModelDto): Promise<Product> {
    const product = this.productRepository.create(payload);
    const newProduct = await this.productRepository.save(product);
    return newProduct;
  }
}
