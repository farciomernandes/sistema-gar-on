import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

export abstract class IDbFindUserByIdRepository {
  abstract findById(id: string): Promise<UserModelDto>;
}
