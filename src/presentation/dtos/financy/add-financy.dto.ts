import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsString } from 'class-validator';

export class AddFinancyModelDto {

  @ApiProperty({
    type: String,
    example: 'Financy Name',
    required: false,
  })
  @Expose()
  @IsString()
  description: string;

  @ApiProperty({
    type: String,
    example: 'INCOME | OUTCOME',
    required: true,
    default: 'OUTCOME'
  })
  @Expose()
  @IsString()
  type: string;

  @ApiProperty({
    type: Number,
    example: 12.59,
    required: true,
  })
  @Expose()
  value: number;

  @ApiProperty({
    type: Date,
    example: new Date(Date.now()),
    required: false,
  })
  @Expose()
  transaction_date: Date = new Date(Date.now());

}
