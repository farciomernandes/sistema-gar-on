import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { IDbUpdateUserRepository } from '@/core/domain/protocols/db/user/update-user-repository';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { UpdateUserDto } from '@/presentation/dtos/user/update-user.dto';
import { UserModelDto } from '@/presentation/dtos/user/user-model.dto';
import { IHasher } from '@/core/domain/protocols/cryptography/hasher';

@Injectable()
export class DbUpdateUser implements IDbUpdateUserRepository {
  private readonly logger = new Logger(DbUpdateUser.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: IHasher,
  ) {}

  async update(payload: UpdateUserDto, id: string): Promise<UserModelDto> {
    try {
      if (payload.password) {
        payload.password = await this.hasher.hash(payload.password);
      }

      return await this.userRepository.update(payload, id);
    } catch (error) {
      if (error.message === 'User not found') {
        throw new BadRequestException(`User not found`);
      } else {
        this.logger.error(error.message);
        throw error;
      }
    }
  }
}
