import { Decrypter } from '@/core/domain/protocols/cryptography/decrypter';
import { Encrypter } from '@/core/domain/protocols/cryptography/encrypter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';

@Injectable()
export class JwtAdapter implements Encrypter, Decrypter {
  private secret: string;
  constructor(private readonly configService: ConfigService) {
    this.secret = configService.get<string>('SISTEMA_GARÇOM__SECRET_KEY');
  }

  async encrypt(payload: any): Promise<string> {
    return jwtSign(payload, this.secret);
  }

  async decrypt(ciphertext: string): Promise<string> {
    return jwtVerify(ciphertext, this.secret) as any;
  }
}
