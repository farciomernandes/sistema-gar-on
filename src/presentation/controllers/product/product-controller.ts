import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IDbAddProductRepository } from '@/core/domain/protocols/db/product/add-product-repository';
import { IDbListProductRepository } from '@/core/domain/protocols/db/product/list-product-respository';
import { IDbDeleteProductRepository } from '@/core/domain/protocols/db/product/delete-product-repository';
import { IDbUpdateProductRepository } from '@/core/domain/protocols/db/product/update-product-repository';
import { Product } from '@/core/domain/models/product.entity';
import { AddProductModelDto } from '@/presentation/dtos/product/add-product.dto';
import {
  GetAllProductsDto,
  ProductModelDto,
} from '@/presentation/dtos/product/product-model.dto';
import { UpdateProductModelDto } from '@/presentation/dtos/product/update-product.dto';
import { ProductParamsDTO } from '@/presentation/dtos/product/params-product.dto';
import { RolesGuard } from '@/infra/guards/roles.guard';
import { RolesEnum } from '@/shared/enums/roles.enum';
import { Roles } from '@/shared/decorators/roles.decorator';

interface ProductReturn {
  category: string;
  snacks?: [{
    id: string;
    name: string;
    quantity: number;
    unit: string;
    price: number;
    description: string;
    category_id: string;
  }];
  stock?: [{
    id: string;
    name: string;
    quantity: number;
    unit: string;
    price: number;
    description: string;
    category_id: string;
  }];
}



@ApiTags('Product')
@Controller('api/v1/products')
export class ProductController {
  constructor(
    private readonly dbAddProduct: IDbAddProductRepository,
    private readonly dbListProduct: IDbListProductRepository,
    private readonly dbUpdateProduct: IDbUpdateProductRepository,
    private readonly dbDeleteProduct: IDbDeleteProductRepository,
  ) { }

  @ApiBody({
    description: 'Create Product',
    type: AddProductModelDto,
  })
  @ApiCreatedResponse({ type: AddProductModelDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  async create(
    @Body() payload: Omit<AddProductModelDto, 'id'>,
  ): Promise<Product> {
    return await this.dbAddProduct.create(payload);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns Products.',
    status: HttpStatus.OK,
    type: GetAllProductsDto,
  })
  async getAll(
    @Query() queryParams: ProductParamsDTO,
  ): Promise<any> {
    try {
      const data = await this.dbListProduct.getAll(queryParams);
      const categoriesMap: any = {};

      if (queryParams.type == 'snack') {
        data.products.forEach((product) => {
          const categoryName = product.category.name;

          if (!categoriesMap[categoryName]) {
            categoriesMap[categoryName] = {
              category: categoryName,
              snacks: [],
            };
          }

          categoriesMap[categoryName].snacks.push({
            id: product.id,
            name: product.name,
            quantity: product.quantity,
            unit: product.unit,
            price: product.price,
            description: product.description,
            tam: product.tam || '',
            category_id: product.category.id
          });
        });
      } else {
        data.products.forEach((product) => {
          const categoryName = product.category.name;

          if (!categoriesMap[categoryName]) {
            categoriesMap[categoryName] = {
              category: categoryName,
              stock: [],
            };
          }

          categoriesMap[categoryName].stock.push({
            id: product.id,
            name: product.name,
            quantity: product.quantity,
            unit: product.unit,
            price: product.price,
            description: product.description,
            tam: product.tam || '',
            category_id: product.category.id
          });
        });
      }

      const productsMapedByCategories = Object.values(categoriesMap);
      productsMapedByCategories as unknown as ProductReturn[];
      const products = this.sortProductsByName(productsMapedByCategories, queryParams.tam, queryParams.type);

      if (queryParams.tam) {
        if ((queryParams.tam === 'P' || queryParams.tam === 'M' || queryParams.tam === 'G' || queryParams.tam === 'FAM')) {

          const filteredProducts = products.filter((product: any) => product.category.toLowerCase().includes('pizza'));
          return filteredProducts;
        }
      }

      return products;
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  sortProductsByName(products, tam: string, type: string) {
    return products.map(category => {
      // Ordena os snacks da categoria
      category.snacks.sort((a, b) => {
        const [prefixA, ...namePartsA] = a.name.split(' - ');
        const [prefixB, ...namePartsB] = b.name.split(' - ');
  
        if (prefixA === prefixB) {
          return namePartsA.join(' - ').localeCompare(namePartsB.join(' - '));
        }
        return prefixA.localeCompare(prefixB);
      });
  
      // Caso a categoria seja "PIZZA" e tenha um tamanho, filtra os snacks pela categoria de tamanho
      if (category.category.toLowerCase().includes("pizza") && tam) {
        if (tam === 'P' || tam === 'M' || tam === 'G' || tam === 'FAM') {
          // Filtra os snacks por tamanho
          const filteredSnacks = category.snacks.filter(snack => snack.tam.toLowerCase() === tam.toLowerCase());
  
          // Retorna uma categoria modificada com os snacks filtrados
          return {
            ...category,
            snacks: filteredSnacks
          };
        }
      }
  
      // Caso não seja "PIZZA" ou não tenha o tamanho, retorna a categoria original
      return category;
    });
  }
  

  @Put(':id')
  @ApiBody({
    type: UpdateProductModelDto,
  })
  @ApiOkResponse({
    description: 'Update success.',
    status: HttpStatus.OK,
    type: ProductModelDto,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateProductModelDto,
  ): Promise<Product> {
    try {
      return await this.dbUpdateProduct.update(payload, id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.dbDeleteProduct.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
