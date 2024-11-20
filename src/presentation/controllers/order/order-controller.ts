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
  import { AddOrderDto } from '@/presentation/dtos/order/add-order.dto';
  import { RolesGuard } from '@/infra/guards/roles.guard';
  import { Roles } from '@/shared/decorators/roles.decorator';
  import { RolesEnum } from '@/shared/enums/roles.enum';
  
  import {
    GetAllOrdersDto,
    OrderModelDto,
    OrderParamsDto,
  } from '@/presentation/dtos/order/order-model.dto';

import { DbAddOrder } from '@/core/application/order/db-add-order';
import { DbListOrder } from '@/core/application/order/db-list-order';
import { DbDeleteOrder } from '@/core/application/order/db-delete-order';
  
  @ApiTags('Order')
  @Controller('api/v1/orders')
  export class OrderController {
    constructor(
      private readonly dbAddOrder: DbAddOrder,
      private readonly dbListOrder: DbListOrder,
      private readonly dbDeleteOrder: DbDeleteOrder,
    ) {}
  
    @ApiBody({
      description: 'Create Order',
      type: AddOrderDto,
    })
    @ApiCreatedResponse({ type: OrderModelDto })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    async create(
      @Body() payload: AddOrderDto,
    ): Promise<OrderModelDto> {
      return await this.dbAddOrder.create(payload);
    }
  
    @Get()
    @ApiOkResponse({
      description: 'Returns Orders.',
      status: HttpStatus.OK,
      type: GetAllOrdersDto,
    })
    @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
    @UseGuards(RolesGuard)
    @ApiBearerAuth()
    async getAll(
      @Query() queryParams: OrderParamsDto,
    ): Promise<GetAllOrdersDto> {
      try {
        return await this.dbListOrder.getAll(queryParams);
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
        return await this.dbDeleteOrder.delete(id);
      } catch (error) {
        throw new HttpException(error.response, error.status);
      }
    }

  }