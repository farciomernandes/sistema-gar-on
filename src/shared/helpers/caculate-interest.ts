import { IInterestCalculator } from '@/core/domain/protocols/helpers/interest-calculator';
import {
  CalculateInterestDTO,
  InterestResultDTO,
} from '@/presentation/dtos/helpers/calculate-interest.dto';

export class InterestCalculator implements IInterestCalculator {
  private fixedFee = 0.49;
  private percentage: number = 1.99 / 100;

  calculateInterest({
    totalValue,
    installments,
  }: CalculateInterestDTO): InterestResultDTO[] {
    const interestArray: InterestResultDTO[] = Array.from(
      { length: installments },
      (_, i) => {
        const quantity = i + 1;
        let totalInterest = 0;
        if (quantity > 1) {
          totalInterest =
            this.fixedFee + totalValue * this.percentage * quantity;
        }
        const totalValueWithInterest = totalValue + totalInterest;
        const valuePerInstallment = totalValueWithInterest / quantity;

        return {
          quantity,
          value: parseFloat(valuePerInstallment.toFixed(2)),
          total: parseFloat(totalValueWithInterest.toFixed(2)),
        };
      },
    );

    return interestArray;
  }
}
