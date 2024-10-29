import { AddProductVariablesModel } from '@/presentation/dtos/product_variable/add-product_variables.dto';
import { Injectable } from '@nestjs/common';
import { ProductVariables } from '../../models/product_variables.entity';
import { UpdateProductVariablesModel } from '@/presentation/dtos/product_variable/update-product_variables.dto';
import { IDbAddProductVariablesRepository } from '../db/product_variables/add-product_variables-repository';
import { IDbDeleteProductVariablesRepository } from '../db/product_variables/delete-product_variables-repository';
import { IDbListProductVariablesRepository } from '../db/product_variables/list-product_variables-respository';
import { IDbFindProductVariableByIdRepository } from '../db/product_variables/find-product_variables-by-id-repository';
import { IDbUpdateProductVariablesRepository } from '../db/product_variables/update-product_variable-repository';
import { ProductVariablesModel } from '@/presentation/dtos/product_variable/product_variables-model.dto';

@Injectable()
export abstract class ProductVariablesRepository
  implements
    IDbAddProductVariablesRepository,
    IDbListProductVariablesRepository,
    IDbUpdateProductVariablesRepository,
    IDbFindProductVariableByIdRepository,
    IDbDeleteProductVariablesRepository
{
  abstract findById(id: string): Promise<ProductVariablesModel>;
  abstract getAll(): Promise<ProductVariables[]>;
  abstract create(
    payload: Omit<AddProductVariablesModel, 'id'>,
  ): Promise<ProductVariables>;
  abstract delete(id: string): Promise<void>;
  abstract update(
    payload: Omit<UpdateProductVariablesModel, 'image_link'>,
    id: string,
    image_link?: any,
  ): Promise<ProductVariables>;
}
