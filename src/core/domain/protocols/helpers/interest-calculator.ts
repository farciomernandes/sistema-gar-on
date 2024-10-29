import {
  CalculateInterestDTO,
  InterestResultDTO,
} from '@/presentation/dtos/helpers/calculate-interest.dto';

export abstract class IInterestCalculator {
  abstract calculateInterest(data: CalculateInterestDTO): InterestResultDTO[];
}
