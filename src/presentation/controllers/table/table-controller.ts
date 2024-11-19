import { DbAddTable } from '@/core/application/table/db-add-table';
import { DbDeleteTable } from '@/core/application/table/db-delete-table';
import { DbListTable } from '@/core/application/table/db-list-table';
import { AddTableModelDto } from '@/presentation/dtos/table/add-table-model.dto';
import { TableModelDto } from '@/presentation/dtos/table/table-model.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Table')
@Controller('api/v1/tables')
export class TableController {
  constructor(
    private readonly dbListTable: DbListTable,
    private readonly dbAddTable: DbAddTable,
    private readonly dbDeleteTable: DbDeleteTable,
  ) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns Tables.',
    status: HttpStatus.OK,
    type: TableModelDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<TableModelDto[]> {
    try {
      return await this.dbListTable.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Post()
  @ApiBody({
    type: AddTableModelDto,
    description:
      'Insert item in existing cart or create new cart with this item',
  })
  @ApiOkResponse({
    description: 'Returns Tables.',
    status: HttpStatus.OK,
    type: TableModelDto,
  })
  @ApiBearerAuth()
  async create(
    @Body() payload: AddTableModelDto,
  ): Promise<TableModelDto> {
    try {

      return await this.dbAddTable.create(payload.num);
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
      return await this.dbDeleteTable.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
