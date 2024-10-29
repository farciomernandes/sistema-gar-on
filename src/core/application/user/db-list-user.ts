import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { IDbListUserRepository } from '@/core/domain/protocols/db/user/list-user-respository';
import {
  GetAllUsersDto,
  UserParamsDto,
} from '@/presentation/dtos/user/user-model.dto';

@Injectable()
export class DbListUser implements IDbListUserRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async getAll(params: UserParamsDto): Promise<GetAllUsersDto> {
    try {
      return await this.userRepository.getAll(params);
    } catch (error) {
      return error;
    }
  }
}
