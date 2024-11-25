import { DbAddFinancy } from '@/core/application/financy/db-add-financy';
import { DbCurrentBalace } from '@/core/application/financy/db-current-balance';
import { DbDeleteFinancy } from '@/core/application/financy/db-delete-financy';
import { DbListFinancy } from '@/core/application/financy/db-list-financy';
import { DbUpdateFinancy } from '@/core/application/financy/db-update-financy';
import { Financy } from '@/core/domain/models/finance.entity';
import { AddFinancyModelDto } from '@/presentation/dtos/financy/add-financy.dto';
import { FinancyModelDto } from '@/presentation/dtos/financy/financy-model.dto';
import { GetBalanceDto } from '@/presentation/dtos/financy/get-balance.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Financy')
@Controller('api/v1/financies')
export class FinancyController {
  constructor(
    private readonly dbListFinancy: DbListFinancy,
    private readonly dbAddFinancy: DbAddFinancy,
    private readonly dbUpdateFinancy: DbUpdateFinancy,
    private readonly dbDeleteFinancy: DbDeleteFinancy,
    private readonly dbCurrentBalace: DbCurrentBalace,

  ) {}

  @Get('current')
  @ApiOkResponse({
    description: 'Returns balance.',
    status: HttpStatus.OK,
    type: GetBalanceDto,
  })
  @ApiBearerAuth()
  async getCurrent(
    @Query() payload: GetBalanceDto
  ): Promise<number> {
    try {
      return await this.dbCurrentBalace.getCurrentFinancy(payload);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns Financys.',
    status: HttpStatus.OK,
    type: FinancyModelDto,
    isArray: true,
  })
  @ApiBearerAuth()
  async getAll(): Promise<Financy[]> {
    try {
      return await this.dbListFinancy.getAll();
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Post()
  @ApiBody({
    type: AddFinancyModelDto,
    description:
      'Insert item in existing cart or create new cart with this item',
  })
  @ApiOkResponse({
    description: 'Returns Financys.',
    status: HttpStatus.OK,
    type: FinancyModelDto,
  })
  @ApiBearerAuth()
  async create(
    @Body() payload: AddFinancyModelDto,
  ): Promise<Financy> {
    try {
      if(payload.type != 'INCOME' && payload.type != 'OUTCOME') {
        throw new BadRequestException(`Type is need INCOME or OUTCOME`);
      }

      return await this.dbAddFinancy.create(payload);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: AddFinancyModelDto,
  })
  @ApiOkResponse({
    description: 'Updated success.',
    status: HttpStatus.OK,
    type: FinancyModelDto,
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() payload: AddFinancyModelDto,
  ): Promise<Financy> {
    try {
      if(payload.type != 'INCOME' && payload.type != 'OUTCOME') {
        throw new BadRequestException(`Type is need INCOME or OUTCOME`);
      }

      return await this.dbUpdateFinancy.update(payload, id);
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
      return await this.dbDeleteFinancy.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
