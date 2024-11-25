import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class FinancyModelDto {
  @ApiProperty({
    type: String,
    example: '65bd52691a0f4c3b57819a4b',
    required: false,
  })
  @Expose()
  id: string;

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
  transaction_date: Date;

}
