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
import { IDbAddUserRepository } from '@/core/domain/protocols/db/user/add-user-repository';
import { IDbListUserRepository } from '@/core/domain/protocols/db/user/list-user-respository';
import {
  CreateUserDto,
  GetAllUsersDto,
  UserModelDto,
  UserParamsDto,
} from '@/presentation/dtos/user/user-model.dto';
import { IDbDeleteUserRepository } from '@/core/domain/protocols/db/user/delete-user-repository';
import { IDbUpdateUserRepository } from '@/core/domain/protocols/db/user/update-user-repository';
import { AddUserDto } from '@/presentation/dtos/user/add-user.dto';
import { UpdateUserDto } from '@/presentation/dtos/user/update-user.dto';
import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';
import { User } from '@/shared/decorators/user.decorator';
import { IDbFindUserByIdRepository } from '@/core/domain/protocols/db/user/find-user-by-id-repository';
import { RolesEnum } from '@/shared/enums/roles.enum';
import { RolesGuard } from '@/infra/guards/roles.guard';
import { Roles } from '@/shared/decorators/roles.decorator';

@ApiTags('User')
@Controller('api/v1/users')
export class UserController {
  constructor(
    private readonly dbAddUser: IDbAddUserRepository,
    private readonly dbListUser: IDbListUserRepository,
    private readonly dbUpdateUser: IDbUpdateUserRepository,
    private readonly dbDeleteUser: IDbDeleteUserRepository,
    private readonly dbFindByIdUser: IDbFindUserByIdRepository,
  ) {}

  @ApiBody({
    description: 'Create User',
    type: AddUserDto,
  })
  @ApiCreatedResponse({ type: CreateUserDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  async create(@Body() payload: AddUserDto): Promise<CreateUserDto> {
    return await this.dbAddUser.create(payload);
  }

  @Get()
  @ApiOkResponse({
    description: 'Returns Users.',
    status: HttpStatus.OK,
    type: GetAllUsersDto,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(RolesGuard)
  async getAll(@Query() queryParams: UserParamsDto): Promise<GetAllUsersDto> {
    try {
      return await this.dbListUser.getAll(queryParams);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Get('me')
  @ApiOkResponse({
    description: 'Returns authenticated user.',
    status: HttpStatus.OK,
    type: UserModelDto,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  @UseGuards(RolesGuard)
  async me(@User() user: Authenticated): Promise<UserModelDto> {
    try {
      return await this.dbFindByIdUser.findById(user.id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Put(':id')
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiOkResponse({
    description: 'Delete success.',
    status: HttpStatus.OK,
    type: UserModelDto,
  })
  @ApiBearerAuth()
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  @UseGuards(RolesGuard)
  async update(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<UserModelDto> {
    try {
      return await this.dbUpdateUser.update(payload, id);
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
  @Roles(RolesEnum.ADMIN, RolesEnum.CUSTOMER)
  @UseGuards(RolesGuard)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.dbDeleteUser.delete(id);
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
