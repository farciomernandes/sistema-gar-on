import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToClass } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({
    type: String,
    example: 'Compra mesa 1',
    required: false,
  })
  @Expose()
  @IsOptional()
  title: string;

  @ApiProperty({
    type: Number,
    example: 100.5,
    required: false,
  })
  @Expose()
  @IsOptional()
  total: number;

  @ApiProperty({
    type: String,
    example: 'b1ca0fd0-1874-4f90-96aa-342f3ea08150',
    required: true,
  })
  @Expose()
  table_id: string;

}