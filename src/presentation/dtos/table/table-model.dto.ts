import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export class TableModelDto {
  @ApiProperty({
    type: String,
    example: '1',
    required: false,
  })
  @Expose()
  id: string;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Número da tabela ou mesa.',
  })
  @Expose()
  @IsNotEmpty()
  @IsInt()
  numberTable: number;

  static toDto(payload: TableModelDto): TableModelDto {
    return plainToInstance(TableModelDto, payload, {
      excludeExtraneousValues: true,
    });
  }
}
