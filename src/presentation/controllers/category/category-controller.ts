import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IDbListCategoryRepository } from '@/core/domain/protocols/db/category/list-category-respository';
import { CategoryModelDto } from '@/presentation/dtos/category/category-model.dto';
import { IDbDeleteCategoryRepository } from '@/core/domain/protocols/db/category/delete-category-repository';
import { IDbUpdateCategoryRepository } from '@/core/domain/protocols/db/category/update-category-repository';
import { Category } from '@/core/domain/models/category.entity';
import { AddCategoryDto } from '@/presentation/dtos/category/add-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '@/infra/config/multer';
import { IDbAddCategoryRepository } from '@/core/domain/protocols/db/category/add-category-repository';
import { UpdateCategoryDto } from '@/presentation/dtos/category/update-category.dto';

@ApiTags('Category')
@Controller('api/v1/categories')
export class CategoryController {
  constructor(
    private readonly dbListCategory: IDbListCategoryRepository,
    private readonly dbAddCategory: IDbAddCategoryRepository,
    private readonly dbUpdateCategory: IDbUpdateCategoryRepository,
    private readonly dbDeleteCategory: IDbDeleteCategoryRepository,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns Categorys.',
    status: HttpStatus.OK,
    type: CategoryModelDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<CategoryModelDto[]> {
    try {
      return await this.dbListCategory.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Post()
  @ApiBody({
    type: AddCategoryDto,
    description:
      'Insert item in existing cart or create new cart with this item',
  })
  @ApiOkResponse({
    description: 'Returns Categorys.',
    status: HttpStatus.OK,
    type: CategoryModelDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image_link', multerConfig))
  @ApiBearerAuth()
  async create(
    @UploadedFile() image_link: any,
    @Body() payload: Omit<AddCategoryDto, 'image_link'>,
  ): Promise<CategoryModelDto> {
    try {
      return await this.dbAddCategory.create(payload, image_link);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image_link', multerConfig))
  @ApiBody({
    type: UpdateCategoryDto,
  })
  @ApiOkResponse({
    description: 'Updated success.',
    status: HttpStatus.OK,
    type: CategoryModelDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: Omit<CategoryModelDto, 'id'>,
    @UploadedFile() image_link: any
  ): Promise<Category> {
    try {
      return await this.dbUpdateCategory.update(payload, id, image_link);
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
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.dbDeleteCategory.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
