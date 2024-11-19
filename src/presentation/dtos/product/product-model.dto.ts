import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CategoryModelDto } from '../category/category-model.dto';

export class ProductModelDto {
  @ApiProperty({
    type: String,
    example: 'Product ID',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: String,
    example: 'Product Name',
    required: false,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Product unit',
    required: false,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  unit: string;

  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
  })
  @Expose()
  is_snack: number;

  @ApiProperty({
    type: String,
    example: 'Product unit',
    required: false,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    example:  1,
    required: false,
  })
  @Expose()
  quantity: number;

  @ApiProperty({
    type: Number,
    example:  1,
    required: false,
  })
  @Expose()
  price: number;

  @ApiProperty({
    type: CategoryModelDto,
    example: CategoryModelDto,
    required: false,
  })
  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  category: CategoryModelDto;

  static toDto(payload: any): ProductModelDto {

    const product = plainToClass(ProductModelDto, payload, {
      excludeExtraneousValues: true,
    });
    const category = CategoryModelDto.toDto(payload.category);

    return {
      ...product,
      category,
    };
  }
}

export class GetAllProductsDto {
  @ApiProperty({
    type: Number,
    example: 20,
    required: false,
  })
  @Expose()
  total: number;

  @ApiProperty({
    type: [ProductModelDto],
    example: ProductModelDto,
  })
  @Expose()
  products: ProductModelDto[];

  @ApiProperty({
    example: 3,
    description: 'Número total de páginas',
  })
  pages: number;

  static toDto(payload: any): GetAllProductsDto {
    return plainToClass(GetAllProductsDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
