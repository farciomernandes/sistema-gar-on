import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IDbDeleteUserRepository } from '@/core/domain/protocols/db/user/delete-user-repository';
import { UserRepository } from '@/core/domain/protocols/repositories/user';

@Injectable()
export class DbDeleteUser implements IDbDeleteUserRepository {
  constructor(private readonly userRepository: UserRepository) {}

  async delete(id: string): Promise<void> {
    try {
      const alreadyExists = await this.userRepository.findById(id);

      if (!alreadyExists) {
        throw new BadRequestException(`User not found`);
      }
      await this.userRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
