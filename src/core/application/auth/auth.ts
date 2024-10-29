import { Encrypter } from '@/core/domain/protocols/cryptography/encrypter';
import { HashComparer } from '@/core/domain/protocols/cryptography/hash-compare';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class Auth {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async auth(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; name: string }> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (user) {
        const isValid = await this.hashComparer.compare(
          password,
          user.password,
        );
        if (isValid) {
          const accessToken = await this.encrypter.encrypt({
            id: user.id,
            roles: user.role,
          });
          return {
            accessToken,
            name: user.name,
          };
        }
      }
      throw new BadRequestException(`user with ${email} not found!`);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
