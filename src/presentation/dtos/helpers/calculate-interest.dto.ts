import { ApiProperty } from '@nestjs/swagger';

export class CalculateInterestDTO {
  @ApiProperty({
    description: 'The total value for which interest needs to be calculated',
    example: 1000,
  })
  totalValue: number;

  @ApiProperty({
    description: 'The number of installments for the payment',
    example: 12,
  })
  installments: number;
}

export class InterestResultDTO {
  @ApiProperty({
    description: 'The installment quantity',
    example: 1,
  })
  quantity: number;

  @ApiProperty({
    description: 'The interest value for the installment quantity',
    example: 2.48,
  })
  value: number;

  @ApiProperty({
    description: 'The total value including interest',
    example: 1002.48,
  })
  total: number;
}
