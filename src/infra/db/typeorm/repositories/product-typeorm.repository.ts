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
      const { name, unit, price, description, category_id } = payload;
  
      const product = await this.productRepository.findOne({
        where: { id }
      });
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      product.name = name ?? product.name;
      product.unit = unit ?? product.unit;
      product.price = price ?? product.price;
      product.description = description ?? product.description;
      product.category_id = category_id ?? product.category_id;
  
      await this.productRepository.save(product);
  
      return product;
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

  async getAll({ type }: ProductParamsDTO, isAdmin: boolean): Promise<GetAllProductsDto> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
  
    const mapProduct = {
      'stock': 0,
      'snack': 1
    }
    queryBuilder.leftJoinAndSelect('product.category', 'category');

    queryBuilder.andWhere('product.is_snack = :snack', { snack: mapProduct[type] })
   
    
    const [products, total] = await queryBuilder
      .take(99999) 
      .skip(((1 || 1) - 1) * 99999)
      .getManyAndCount();
  
    const totalPages = Math.ceil(total / 1);
  
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
