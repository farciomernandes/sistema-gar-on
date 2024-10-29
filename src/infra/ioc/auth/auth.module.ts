import { Module } from '@nestjs/common';

import { IAuth } from '@/core/domain/protocols/auth/auth';
import { AuthController } from '@/presentation/controllers/auth/auth-controller';
import { authProvider } from './auth.provider';
import { Encrypter } from '@/core/domain/protocols/cryptography/encrypter';
import { Decrypter } from '@/core/domain/protocols/cryptography/decrypter';
import { HashComparer } from '@/core/domain/protocols/cryptography/hash-compare';

@Module({
  imports: [],
  providers: [...authProvider],
  controllers: [AuthController],
  exports: [HashComparer, Decrypter, Encrypter, IAuth],
})
export class AuthModule {}
