import { IAuth } from '@/core/domain/protocols/auth/auth';
import { Authenticated } from '@/presentation/dtos/auth/authenticated.dto';
import { AuthenticatedDto, LoginDto } from '@/presentation/dtos/auth/login.dto';

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly auth: IAuth) {}

  @ApiBody({
    type: LoginDto,
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: AuthenticatedDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async authentication(@Body() payload: LoginDto): Promise<any> {
    return await this.auth.auth(payload.email, payload.password);
  }
}
