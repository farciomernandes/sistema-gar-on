import {
  GetAllUsersDto,
  UserParamsDto,
} from '@/presentation/dtos/user/user-model.dto';

export abstract class IDbListUserRepository {
  abstract getAll(params: UserParamsDto): Promise<GetAllUsersDto>;
}
