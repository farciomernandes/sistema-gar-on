import { AddUserDto } from '@/presentation/dtos/user/add-user.dto';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

export abstract class IDbAddUserRepository {
  abstract create(payload: AddUserDto): Promise<UserModelDto>;
}
