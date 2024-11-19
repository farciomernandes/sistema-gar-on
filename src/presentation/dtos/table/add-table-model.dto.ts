import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export class AddTableModelDto {

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Número da tabela ou mesa.',
  })
  @Expose()
  @IsNotEmpty()
  @IsInt()
  num: number;

}
