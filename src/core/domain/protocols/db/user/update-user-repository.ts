import { UpdateUserDto } from '@/presentation/dtos/user/update-user.dto';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

export abstract class IDbUpdateUserRepository {
  abstract update(payload: UpdateUserDto, id: string): Promise<UserModelDto>;
}
