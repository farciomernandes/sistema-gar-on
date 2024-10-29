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

@ApiTags('Product')
@Controller('api/v1/products')
export class ProductController {
  constructor(
    private readonly dbAddProduct: IDbAddProductRepository,
    private readonly dbListProduct: IDbListProductRepository,
    private readonly dbUpdateProduct: IDbUpdateProductRepository,
    private readonly dbDeleteProduct: IDbDeleteProductRepository,
  ) {}

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
  ): Promise<GetAllProductsDto> {
    try {
      return await this.dbListProduct.getAll(queryParams);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Get('/admin')
  @ApiOkResponse({
    description: 'Returns Products.',
    status: HttpStatus.OK,
    type: GetAllProductsDto,
  })
  @ApiBearerAuth()
  async getAllAdmin(
    @Query() queryParams: ProductParamsDTO,
  ): Promise<GetAllProductsDto> {
    try {
      return await this.dbListProduct.getAll(queryParams, true);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
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
