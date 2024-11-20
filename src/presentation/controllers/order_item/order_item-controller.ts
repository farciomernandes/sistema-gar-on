import { DbAddOrderItem } from '@/core/application/order-item/db-add-order_item';
import { DbDeleteOrderItem } from '@/core/application/order-item/db-delete-order-item';
import { DbListOrderItem } from '@/core/application/order-item/db-list-order_item';
import { OrderItem } from '@/core/domain/models/order_item.entity';
import { RolesGuard } from '@/infra/guards/roles.guard';
import { AddOrderItemDto } from '@/presentation/dtos/order_item/add-order_item.dto';
import { OrderItemDto } from '@/presentation/dtos/order_item/order_item-model.dto';
import { Roles } from '@/shared/decorators/roles.decorator';
import { RolesEnum } from '@/shared/enums/roles.enum';
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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Order Item')
@Controller('api/v1/order_items')
export class OrderItemController {
  constructor(
    private readonly dbAddOrderItem: DbAddOrderItem,
    private readonly dbListOrderItem: DbListOrderItem,
    private readonly dbDeleteOrderItem: DbDeleteOrderItem,
  ) {}

  @ApiBody({
    description: 'Create OrderItem',
    type: AddOrderItemDto,
  })
  @ApiCreatedResponse({ type: OrderItemDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async create(@Body() payload: AddOrderItemDto): Promise<OrderItemDto> {
    return await this.dbAddOrderItem.create(payload);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns order_items.',
    status: HttpStatus.OK,
    type: OrderItemDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<OrderItemDto[]> {
    try {
      return await this.dbListOrderItem.getAll();
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
      return await this.dbDeleteOrderItem.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}