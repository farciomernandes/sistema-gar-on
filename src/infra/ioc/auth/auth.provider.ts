import { Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Auth } from '@/core/application/auth/auth';
import { UserTypeOrmRepository } from '@/infra/db/typeorm/repositories/user-typeorm.repository';
import { User } from '@/core/domain/models/user.entity';
import { UserRepository } from '@/core/domain/protocols/repositories/user';
import { HashComparer } from '@/core/domain/protocols/cryptography/hash-compare';
import { BcryptAdapter } from '@/infra/adapters/bcrypt-adapter';
import { Encrypter } from '@/core/domain/protocols/cryptography/encrypter';
import { JwtAdapter } from '@/infra/adapters/jwt-adapter';
import { Decrypter } from '@/core/domain/protocols/cryptography/decrypter';
import { ConfigService } from '@nestjs/config';
import { IAuth } from '@/core/domain/protocols/auth/auth';

export const authProvider: Provider[] = [
  Auth,
  {
    provide: UserTypeOrmRepository,
    useFactory: (dataSource: DataSource) => {
      return new UserTypeOrmRepository(dataSource.getRepository(User));
    },
    inject: [getDataSourceToken()],
  },
  {
    provide: UserRepository,
    useClass: UserTypeOrmRepository,
  },
  {
    provide: BcryptAdapter,
    useFactory: (configService: ConfigService): BcryptAdapter => {
      return new BcryptAdapter(configService);
    },
    inject: [ConfigService],
  },
  {
    provide: JwtAdapter,
    useFactory: (configService: ConfigService): JwtAdapter => {
      return new JwtAdapter(configService);
    },
    inject: [ConfigService],
  },
  {
    provide: HashComparer,
    useClass: BcryptAdapter,
  },
  {
    provide: Decrypter,
    useClass: JwtAdapter,
  },
  {
    provide: Encrypter,
    useClass: JwtAdapter,
  },
  {
    provide: IAuth,
    useFactory: (
      userRepository: UserRepository,
      hashComparer: HashComparer,
      encrypter: Encrypter,
    ): Auth => {
      return new Auth(userRepository, hashComparer, encrypter);
    },
    inject: [UserTypeOrmRepository, BcryptAdapter, JwtAdapter],
  },
];
