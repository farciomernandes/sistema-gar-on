import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetBalanceDto {

  @ApiProperty({
    type: String,
    example: '2024-11-30 23:59:59',
    required: false,
  })
  @Expose()
  startDate: string;

  @ApiProperty({
    type: String,
    example: '2024-12-31 23:59:59',
    required: false,
  })
  @Expose()
  endDate: string;

}
