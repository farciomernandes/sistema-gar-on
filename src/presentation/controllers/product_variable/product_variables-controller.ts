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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '@/infra/config/multer';
import { IDbAddProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/add-product_variables-repository';
import { IDbListProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/list-product_variables-respository';
import { IDbUpdateProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/update-product_variable-repository';
import { IDbDeleteProductVariablesRepository } from '@/core/domain/protocols/db/product_variables/delete-product_variables-repository';
import { UpdateProductVariablesModel } from '@/presentation/dtos/product_variable/update-product_variables.dto';
import { AddProductVariablesModel } from '@/presentation/dtos/product_variable/add-product_variables.dto';
import { ProductVariables } from '@/core/domain/models/product_variables.entity';
import { ProductVariablesModel } from '@/presentation/dtos/product_variable/product_variables-model.dto';
import { RolesEnum } from '@/shared/enums/roles.enum';
import { RolesGuard } from '@/infra/guards/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';

@ApiTags('Product Variables')
@Controller('api/v1/product_variables')
export class ProductVariablesController {
  constructor(
    private readonly dbAddProductVariables: IDbAddProductVariablesRepository,
    private readonly dbListProductVariables: IDbListProductVariablesRepository,
    private readonly dbUpdateProductVariables: IDbUpdateProductVariablesRepository,
    private readonly dbDeleteProductVariables: IDbDeleteProductVariablesRepository,
  ) {}

  @ApiBody({
    description: 'Create ProductVariables',
    type: AddProductVariablesModel,
  })
  @ApiCreatedResponse({ type: AddProductVariablesModel })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image_link', multerConfig))
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  async create(
    @UploadedFile() image_link: any,
    @Body() payload: Omit<AddProductVariablesModel, 'image_link'>,
  ): Promise<ProductVariables> {
    return await this.dbAddProductVariables.create(payload, image_link);
  }

  @ApiCreatedResponse({ type: UpdateProductVariablesModel })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image_link', multerConfig))
  @Put(':id')
  @ApiBody({
    type: UpdateProductVariablesModel,
  })
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
    type: ProductVariablesModel,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() payload: Omit<UpdateProductVariablesModel, 'image_link'>,
    @UploadedFile() image_link: any
  ): Promise<ProductVariables> {
    try {
      return await this.dbUpdateProductVariables.update(
        payload,
        id,
        image_link,
      );
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns ProductVariabless.',
    status: HttpStatus.OK,
    type: ProductVariablesModel,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<ProductVariables[]> {
    try {
      return await this.dbListProductVariables.getAll();
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
      return await this.dbDeleteProductVariables.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
