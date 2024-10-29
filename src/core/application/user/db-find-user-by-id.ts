import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { IDbFindUserByIdRepository } from '@/core/domain/protocols/db/user/find-user-by-id-repository';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';

@Injectable()
export class DbFindUserById implements IDbFindUserByIdRepository {
  constructor(private readonly userRepository: UserRepository) {}
  async findById(id: string): Promise<UserModelDto> {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new BadRequestException(`User not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
