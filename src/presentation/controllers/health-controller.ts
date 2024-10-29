import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
export class HealthStatusDto {
  status: string;
}
@ApiTags('health')
@Controller('api/v1/health')
export class HealthController {
  @Get()
  @ApiOkResponse({
    description: 'Returns the health status of the service.',
    type: HealthStatusDto,
  })
  check(): HealthStatusDto {
    return { status: 'OK' };
  }
}
